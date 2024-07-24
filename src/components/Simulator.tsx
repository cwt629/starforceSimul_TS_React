import { useDispatch, useSelector } from "react-redux";
import { CurrentState } from "../type/state";
import { Dispatcher, grantDestroy, grantFailure, grantSuccess, setPreventDestroy, setStarcatch } from "../store/store";
import { Result, ResultExpectation } from "../type/result";
import { getExpectationByStarcatch, getReinforceResult, isPreventableStar } from "../utils/reinforce";
import React from "react";

function Simulator() {
    const state: CurrentState = useSelector((state: CurrentState) => (state));
    const dispatch: Dispatcher = useDispatch();

    // 스타캐치 해제 체크박스 클릭 이벤트
    const handleStarCatch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        dispatch(setStarcatch(checked));
    }

    // 파괴방지 체크박스 클릭 이벤트
    const handlePreventDestroy = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        dispatch(setPreventDestroy(checked));
    }

    // 강화하기 버튼 클릭 이벤트
    const handleClick = () => {
        // 이미 최대 강화 단계인 경우
        if (state.currentStar >= state.maxStar) {
            alert("이미 최대 강화 단계에 도달했습니다.");
            return;
        }

        // 현재 적용되는 확률 정보
        let currentExp: ResultExpectation = {
            success: state.successPercent,
            failure: 0,
            destroy: (isPreventableStar(state.currentStar) && state.preventDestroy) ? 0 : state.destroyPercent // 파괴방지 적용
        };
        currentExp.failure = 100 - currentExp.success - currentExp.destroy;

        // 실제로 적용될 확률 정보
        let finalExp: ResultExpectation = getExpectationByStarcatch(currentExp, !state.noStarcatch);

        const result: Result = getReinforceResult(finalExp.success, finalExp.destroy);
        switch (result) {
            case Result.success:
                dispatch(grantSuccess());
                break;

            case Result.failure:
                dispatch(grantFailure());
                break;

            case Result.destroy:
                dispatch(grantDestroy());
                break;
        }
    }

    return (state.ready ?
        <div className="simulator">
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="starcatch"
                    onChange={(e) => handleStarCatch(e)} />
                <label className="form-check-label" htmlFor="starcatch">스타캐치 해제</label>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="destroyShield"
                    onChange={(e) => handlePreventDestroy(e)} disabled={state.destroyPercent === 0 || !isPreventableStar(state.currentStar)} />
                <label className="form-check-label" htmlFor="destroyShield">파괴방지</label>
            </div>
            <button type="button" className="btn btn-outline-primary"
                onClick={handleClick}>강화하기</button>
        </div> : <></>
    )
}

export default Simulator;