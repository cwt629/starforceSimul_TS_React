import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LogData } from "../type/state";
import { Result } from "../type/result";
import { isChance } from "../utils/chance";
import StarDisplay from "./StarDisplay";
import Simulator from "./Simulator";

function LeaderBoard() {
    const ready: boolean = useSelector((state: RootState) => (state.ready));
    const level: number = useSelector((state: RootState) => (state.level));
    const start: number = useSelector((state: RootState) => (state.start));
    const goal: number = useSelector((state: RootState) => (state.goal));
    const restoreCost: bigint = useSelector((state: RootState) => (state.restoreCost));
    const totalSpent: bigint = useSelector((state: RootState) => (state.totalSpent));
    const totalSuccess: number = useSelector((state: RootState) => (state.totalSuccess));
    const totalFailure: number = useSelector((state: RootState) => (state.totalFailure));
    const totalDestroy: number = useSelector((state: RootState) => (state.totalDestroy));
    const cost: bigint = useSelector((state: RootState) => (state.cost));
    const currentStar: number = useSelector((state: RootState) => (state.currentStar));
    const maxStar: number = useSelector((state: RootState) => (state.maxStar));
    const successPercent: number = useSelector((state: RootState) => (state.successPercent));
    const failurePercent: number = useSelector((state: RootState) => (state.failurePercent));
    const destroyPercent: number = useSelector((state: RootState) => (state.destroyPercent));
    const ableToFall: boolean = useSelector((state: RootState) => (state.ableToFall));
    const log: LogData[] = useSelector((state: RootState) => (state.log));
    const recentResult: number = (log.length > 0) ? log[log.length - 1].result : -1;

    return (
        ready ?
            (<div>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>장비 레벨</td>
                            <td>{level}</td>
                        </tr>
                        <tr>
                            <td>목표</td>
                            <td>{start}성 {">"} {goal}성</td>
                        </tr>
                        <tr>
                            <td>장비 복구 비용</td>
                            <td>{restoreCost > BigInt(0) ? restoreCost.toLocaleString() + "메소" : "미설정"}</td>
                        </tr>
                        <tr>
                            <td>총 사용 메소</td>
                            <td>{totalSpent.toLocaleString()}메소</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-bordered">
                    <tbody>
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
                            <td>{totalSuccess.toLocaleString()}</td>
                            <td>{totalFailure.toLocaleString()}</td>
                            <td>{totalDestroy.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div>
                                    <StarDisplay />
                                    <div className="upgrade-info">
                                        {isChance(log) ? <div>CHANCE TIME!</div> : ''}
                                        현재 단계: {currentStar}성<br />
                                        {currentStar < maxStar ? <>
                                            강화 비용: {cost.toLocaleString()}메소<br />
                                            성공 확률: {successPercent.toFixed(1)}%<br />
                                            실패({ableToFall ? "하락" : "유지"}) 확률: {failurePercent.toFixed(1)}%<br />
                                            {destroyPercent > 0 ? `파괴 확률: ${destroyPercent.toFixed(1)}%` : ``}
                                        </>
                                            :
                                            <>
                                                최고 강화 단계인 {maxStar}성에 도달했습니다!
                                            </>}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <Simulator />
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>) : (<></>)
    )
}

export default LeaderBoard;