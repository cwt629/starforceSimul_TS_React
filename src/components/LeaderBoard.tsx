import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CurrentState } from "../type/state";
import { Result } from "../type/result";
import { isChance } from "../utils/chance";

function LeaderBoard() {
    const state: CurrentState = useSelector((state: RootState) => (state));
    const recentResult: number = (state.log.length > 0) ? state.log[state.log.length - 1].result : -1;

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
                        <td>{state.restoreCost > BigInt(0) ? state.restoreCost.toLocaleString() + "메소" : "미설정"}</td>
                    </tr>
                    <tr>
                        <td>총 사용 메소</td>
                        <td>{state.totalSpent.toLocaleString()}메소</td>
                    </tr>
                </table>
                <table className="table table-bordered">
                    <tr>
                        <td colSpan={3}>
                            <div>
                                {recentResult === Result.success ? "강화 성공!"
                                    : recentResult === Result.failure ? "강화 실패"
                                        : recentResult === Result.destroy ? "장비 파괴..."
                                            : "강화를 진행하세요."}
                            </div>
                        </td>
                    </tr>
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
                    {isChance(state.log) ? <div>CHANCE TIME!</div> : ''}
                    현재 단계: {state.currentStar}성<br />
                    {state.currentStar < state.maxStar ? <>
                        강화 비용: {state.cost.toLocaleString()}메소<br />
                        성공 확률: {state.successPercent.toFixed(1)}%<br />
                        실패({state.ableToFall ? "하락" : "유지"}) 확률: {state.failurePercent.toFixed(1)}%<br />
                        {state.destroyPercent > 0 ? `파괴 확률: ${state.destroyPercent.toFixed(1)}%` : ``}
                    </>
                        :
                        <>
                            최고 강화 단계인 {state.maxStar}성에 도달했습니다!
                        </>}

                </div>
            </div>) : (<></>)
    )
}

export default LeaderBoard;