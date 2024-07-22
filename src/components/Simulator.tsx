import { useDispatch, useSelector } from "react-redux";
import { CurrentState } from "../type/state";
import { Dispatcher, grantDestroy, grantFailure, grantSuccess } from "../store/store";
import { Result } from "../type/result";
import { getReinforceResult } from "../utils/reinforce";

function Simulator() {
    const state: CurrentState = useSelector((state: CurrentState) => (state));
    const dispatch: Dispatcher = useDispatch();

    // 버튼 클릭 이벤트
    const handleClick = () => {
        const result: Result = getReinforceResult(state.successPercent, state.destroyPercent);
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
        <div>
            <button type="button" className="btn btn-outline-primary"
                onClick={handleClick}>강화하기</button>
        </div> : <></>
    )
}

export default Simulator;