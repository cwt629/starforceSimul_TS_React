import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CurrentState } from "../type/state";

function LeaderBoard() {
    const state: CurrentState = useSelector((state: RootState) => (state));

    return (
        state.ready ?
            (<div>
                <table>
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
                <div>
                    강화 비용: {state.cost.toString()}메소<br />
                    성공 확률: {state.successPercent}%<br />
                    실패({state.ableToFall ? "하락" : "유지"}) 확률: {state.failurePercent}%<br />
                    파괴 확률: {state.destroyPercent}%

                </div>
            </div>) : (<></>)
    )
}

export default LeaderBoard;