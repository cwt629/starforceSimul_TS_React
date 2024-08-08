import { Result } from "../../type/result";
import { UserLog } from "../../type/storage";
import { getFormattedDate } from "../../utils/dateformat";
import { getLogInStorage } from "../../utils/storage";

function Log() {
    const storageLog: UserLog[] = getLogInStorage();
    return (
        <div className="list-group log-list">
            {storageLog.length > 0 ?
                storageLog.map((data, index) => (
                    <div key={index} >
                        <a href={`#log${index}`} data-bs-toggle="collapse"
                            className="list-group-item list-group-item-action reinforce-log">
                            <table className="table table-bordered log-card">
                                <tbody>
                                    <tr>
                                        <td colSpan={2}><b>{data.title}</b></td>
                                        <td>삭제하기</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>{getFormattedDate(data.date.toLocaleString())}</td>
                                        <td>목표: {data.setting.start}&nbsp;{">"}&nbsp;{data.setting.goal}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            총 강화 횟수 {data.total.success + data.total.failure + data.total.destroy}회<br />
                                            <span className="badge bg-success">성공</span>&nbsp;{data.total.success}&nbsp;
                                            <span className="badge bg-danger">실패</span>&nbsp;{data.total.failure}&nbsp;
                                            <span className="badge bg-dark">파괴</span>&nbsp;{data.total.destroy}&nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            총 {BigInt(data.total.cost).toLocaleString()}메소 소모<br />
                                            (복구 비용 설정: {BigInt(data.setting.restoreCost).toLocaleString()}메소)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </a>
                        <ul className="list-group collapse log-detail" id={`log${index}`}>
                            {data.log.map((d, i) => (
                                <li key={i} className="list-group-item">
                                    {
                                        d.result === Result.success ? <span className="badge bg-success">성공</span>
                                            : d.result === Result.failure ? <span className="badge bg-danger">실패</span>
                                                : d.result === Result.destroy ? <span className="badge bg-dark">파괴</span>
                                                    : <span className="badge bg-info">??</span>
                                    }
                                    &nbsp;&nbsp;
                                    {d.from}성 {">"} {d.to}성
                                </li>
                            ))}
                            <button className="btn btn-outline-secondary btn-sm shrinker" data-bs-target={`#log${index}`} data-bs-toggle="collapse">접기 ▲</button>
                        </ul>
                    </div>
                ))
                : <div>저장된 데이터가 없습니다.</div>
            }
        </div>
    )
}

export default Log;