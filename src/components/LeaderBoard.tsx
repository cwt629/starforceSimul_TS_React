import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CurrentState } from "../type/state";

function LeaderBoard() {
    const state: CurrentState = useSelector((state: RootState) => (state));

    return (
        state.ready ?
            (<div>
                <table className="table table-bordered">
                    <tr>
                        <td>장비 레벨</td>
                        <td>{state.level}</td>
                    </tr>
                    <tr>
                        <td>목표</td>
                        <td>{state.start}성 {">"} {state.goal}성</td>
                    </tr>
                    <tr>
                        <td>장비 복구 비용</td>
                        <td>{state.restoreCost > BigInt(0) ? state.restoreCost.toString() + "메소" : "미설정"}</td>
                    </tr>
                    <tr>
                        <td>총 사용 메소</td>
                        <td>{state.totalSpent.toString()}메소</td>
                    </tr>
                </table>
                <table className="table table-bordered">
                    <tr>
                        <td>성공</td><td>실패</td><td>파괴</td>
                    </tr>
                    <tr>
                        <td>{state.totalSuccess.toLocaleString()}</td>
                        <td>{state.totalFailure.toLocaleString()}</td>
                        <td>{state.totalDestroy.toLocaleString()}</td>
                    </tr>
                </table>
                <div>
                    강화 비용: {state.cost.toLocaleString()}메소<br />
                    성공 확률: {state.successPercent.toFixed(1)}%<br />
                    실패({state.ableToFall ? "하락" : "유지"}) 확률: {state.failurePercent.toFixed(1)}%<br />
                    {state.destroyPercent > 0 ? `파괴 확률: ${state.destroyPercent.toFixed(1)}%` : ``}
                </div>
            </div>) : (<></>)
    )
}

export default LeaderBoard;