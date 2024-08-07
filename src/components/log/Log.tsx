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
                    <div>
                        <a key={index} href={`#log${index}`} data-bs-toggle="collapse"
                            className="list-group-item list-group-item-action reinforce-log">
                            <div>{data.title}</div>
                            <div>{getFormattedDate(data.date.toLocaleString())}</div>
                            <div>강화 횟수 총 <span>{data.total.success + data.total.failure + data.total.destroy}</span>회</div>
                            <div><span className="success-count">{data.total.success}</span>회 성공,&nbsp;
                                <span className="failure-count">{data.total.failure}</span>회 실패,&nbsp;
                                <span className="destroy-count">{data.total.destroy}</span>회 파괴
                            </div>
                            <div>총 {BigInt(data.total.cost).toLocaleString()}메소 소모</div>
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
                                    {d.from}성 {">"} {d.to}성
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
                : <div>저장된 데이터가 없습니다.</div>
            }
        </div>
    )
}

export default Log;