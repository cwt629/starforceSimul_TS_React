import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { LogData } from "../type/state";
import { Result } from "../type/result";
import { isChance } from "../utils/chance";
import StarDisplay from "./StarDisplay";
import Simulator from "./Simulator";
import { MVPRank } from "../type/discount";
import Options from "./Options";

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
    const nextStar: number = useSelector((state: RootState) => (state.nextStar));
    const maxStar: number = useSelector((state: RootState) => (state.maxStar));
    const successPercent: number = useSelector((state: RootState) => (state.successPercent));
    const failurePercent: number = useSelector((state: RootState) => (state.failurePercent));
    const destroyPercent: number = useSelector((state: RootState) => (state.destroyPercent));
    const ableToFall: boolean = useSelector((state: RootState) => (state.ableToFall));
    const log: LogData[] = useSelector((state: RootState) => (state.log));
    const mvpRank: MVPRank = useSelector((state: RootState) => (state.mvpRank));
    const pcRoomApplied: boolean = useSelector((state: RootState) => (state.pcRoomApplied));
    const bonusUnderTen: boolean = useSelector((state: RootState) => (state.bonusUnderTen));
    const eventDC30: boolean = useSelector((state: RootState) => (state.eventDC30));
    const successOnFives: boolean = useSelector((state: RootState) => (state.successOnFives));
    const recentResult: number = (log.length > 0) ? log[log.length - 1].result : -1;

    const MVPRankName: string = (mvpRank === MVPRank.bronze) ? "브론즈" :
        (mvpRank === MVPRank.silver) ? "실버" :
            (mvpRank === MVPRank.gold) ? "골드" :
                (mvpRank === MVPRank.dia || mvpRank === MVPRank.red) ? "다이아/레드" : "불명";

    let appliedEventNames: string[] = [];
    // 출력할 이벤트 이름들을 넣어준다
    if (bonusUnderTen) appliedEventNames.push("10성 이하 강화 시 1+1");
    if (eventDC30) appliedEventNames.push("강화 비용 30% 할인");
    if (successOnFives) appliedEventNames.push("5, 10, 15성에서 강화 성공 100%");

    return (
        ready ?
            (<div id="leaderboard">
                <table className="table table-bordered setting-table">
                    <tbody>
                        <tr>
                            <td width={80}>장비 레벨</td>
                            <td width={140}>{level}</td>
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
                            <td>
                                할인/이벤트<br />
                                <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#optionModal">
                                    <i className="bi bi-gear"></i>&nbsp;설정
                                </button>
                            </td>
                            <td>
                                <ul>
                                    <li>MVP 랭크: {MVPRankName}</li>
                                    <li>PC방 할인 적용 {pcRoomApplied ? "O" : "X"}</li>
                                    <li>이벤트 적용
                                        {
                                            appliedEventNames.length > 0 ?
                                                <ul>
                                                    {appliedEventNames.map((eventName, index) => (<li key={index}>{eventName}</li>))}
                                                </ul>
                                                :
                                                <ul>
                                                    <li>없음</li>
                                                </ul>
                                        }
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td><b>총 소비</b></td>
                            <td><b>{totalSpent.toLocaleString()}메소</b></td>
                        </tr>

                    </tbody>
                </table>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                <div className="result-board">
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
                        <tr className={
                            recentResult === Result.success ? "success"
                                : recentResult === Result.failure ? "failure"
                                    : recentResult === Result.destroy ? "destroy" : ""
                        }>
                            <td className="success-count">{totalSuccess.toLocaleString()}</td>
                            <td className="failure-count">{totalFailure.toLocaleString()}</td>
                            <td className="destroy-count">{totalDestroy.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div>
                                    <StarDisplay />
                                    <div className="upgrade-info">
                                        {isChance(log) ? <div>CHANCE TIME!</div> : ''}
                                        현재 강화: {currentStar}성 {">"} {nextStar}성<br />
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
                <div className="modal fade" id="optionModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header-custom">
                                <h4 className="modal-title">이벤트 설정</h4>
                                <button type="button" className="btn-close modal-header-close" data-bs-dismiss="modal"></button>
                            </div>

                            <Options />

                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>

            </div>) : (<div id="leaderboard"></div>)
    )
}

export default LeaderBoard;