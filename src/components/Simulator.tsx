import { useDispatch, useSelector } from "react-redux";
import { Dispatcher, grantDestroy, grantFailure, grantSuccess, RootState, saveResult, setPreventDestroy, setStarcatch } from "../store/store";
import { Result, ResultExpectation } from "../type/result";
import { getExpectationByStarcatch, getReinforceResult, isPreventableStar } from "../utils/reinforce";
import React, { useEffect } from "react";
import { alertWithSwal } from "../utils/alert";
import { UserLog } from "../type/storage";
import { LogData } from "../type/state";
import { finishAndGetTitle } from "../utils/storage";

function Simulator() {
    const ready: boolean = useSelector((state: RootState) => (state.ready));
    const currentStar: number = useSelector((state: RootState) => (state.currentStar));
    const maxStar: number = useSelector((state: RootState) => (state.maxStar));
    const successPercent: number = useSelector((state: RootState) => (state.successPercent));
    const destroyPercent: number = useSelector((state: RootState) => (state.destroyPercent));
    const noStarcatch: boolean = useSelector((state: RootState) => (state.noStarcatch));
    const preventDestroy: boolean = useSelector((state: RootState) => (state.preventDestroy));
    const achieved: boolean = useSelector((state: RootState) => (state.achieved));
    const log: LogData[] = useSelector((state: RootState) => (state.log));
    const level: number = useSelector((state: RootState) => (state.level));
    const start: number = useSelector((state: RootState) => (state.start));
    const goal: number = useSelector((state: RootState) => (state.goal));
    const restoreCost: bigint = useSelector((state: RootState) => (state.restoreCost));
    const totalSuccess: number = useSelector((state: RootState) => (state.totalSuccess));
    const totalFailure: number = useSelector((state: RootState) => (state.totalFailure));
    const totalDestroy: number = useSelector((state: RootState) => (state.totalDestroy));
    const totalSpent: bigint = useSelector((state: RootState) => (state.totalSpent));
    const autoSaved: boolean = useSelector((state: RootState) => (state.autoSaved));
    const dispatch: Dispatcher = useDispatch();

    useEffect(() => {
        if (achieved && !autoSaved) {
            let currentLog: UserLog = {
                title: '',
                date: new Date(),
                log: log,
                setting: {
                    level: level,
                    start: start,
                    goal: goal,
                    restoreCost: restoreCost
                },
                total: {
                    success: totalSuccess,
                    failure: totalFailure,
                    destroy: totalDestroy,
                    cost: totalSpent
                }
            };

            finishAndGetTitle(currentLog)
                .then((title: string) => {
                    dispatch(saveResult(title));
                    alertWithSwal({
                        icon: 'success',
                        text: '강화 내역이 저장되었습니다!\n나의 강화 기록 탭에서 확인하실 수 있습니다.',
                        buttonClass: 'btn btn-success'
                    });
                })
        }
    }, [achieved])

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
        if (currentStar >= maxStar) {
            alertWithSwal({ icon: 'info', text: '이미 최대 강화 단계에 도달했습니다.', buttonClass: 'btn btn-primary' });
            return;
        }

        // 현재 적용되는 확률 정보
        let currentExp: ResultExpectation = {
            success: successPercent,
            failure: 0,
            destroy: (isPreventableStar(currentStar) && preventDestroy) ? 0 : destroyPercent // 파괴방지 적용
        };
        currentExp.failure = 100 - currentExp.success - currentExp.destroy;

        // 실제로 적용될 확률 정보
        let finalExp: ResultExpectation = getExpectationByStarcatch(currentExp, !noStarcatch);

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

    return (ready ?
        <div className="simulator">
            <div className="simul-options">
                <span className="options-category">비용 할인 옵션</span>
                <div className="discount-options">
                    <table className="table table-bordered option-table">
                        <tbody>
                            <tr>
                                <td><b>MVP 할인</b></td>
                                <td>
                                    <div className="discount-options-mvp">
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" id="nomvp" name="mvp" defaultChecked />
                                            <label className="form-check-label" htmlFor="nomvp">브론즈</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" id="mvpsilver" name="mvp" />
                                            <label className="form-check-label" htmlFor="mvpsilver">실버</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" id="mvpgold" name="mvp" />
                                            <label className="form-check-label" htmlFor="mvpgold">골드</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" id="mvpdiared" name="mvp" />
                                            <label className="form-check-label" htmlFor="mvpdiared">다이아,레드</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><b>PC방 할인</b></td>
                                <td>
                                    <div className="discount-options-pcroom">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="pccheck" />
                                            <label className="form-check-label" htmlFor="pccheck">PC방 혜택 적용</label>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>


                </div>
            </div>
            <div className="simul-ingame">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="starcatch"
                        checked={noStarcatch}
                        onChange={(e) => handleStarCatch(e)} />
                    <label className="form-check-label" htmlFor="starcatch">스타캐치 해제</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="destroyShield"
                        checked={preventDestroy}
                        onChange={(e) => handlePreventDestroy(e)} disabled={destroyPercent === 0 || !isPreventableStar(currentStar)} />
                    <label className="form-check-label" htmlFor="destroyShield">파괴방지</label>
                </div>
                <button type="button" className="btn btn-outline-primary"
                    onClick={handleClick}>강화하기</button>
            </div>
        </div> : <></>
    )
}

export default Simulator;