import { useState } from "react";
import { Result } from "../../type/result";
import { confirmWithSwal } from "../../utils/alert";
import { getFormattedDate } from "../../utils/dateformat";
import { deleteLogInStorage, getLogInStorage } from "../../utils/storage";
import DestroyBadge from "./badges/DestroyBadge";
import FailureBadge from "./badges/FailureBadge";
import SuccessBadge from "./badges/SuccessBadge";

function Log() {
    const [storageLog, setStorageLog] = useState(getLogInStorage());

    // 삭제 버튼 클릭 이벤트
    const handleDeleteClick = (index: number, title: string) => {
        confirmWithSwal({
            icon: 'warning',
            text: `삭제된 데이터는 복구할 수 없습니다.\n정말 해당 로그를 삭제하시겠습니까?\n제목: ${title}`,
            buttonClass: 'btn btn-danger mg-10',
            buttonClass2: 'btn btn-secondary mg-10'
        }).then((res) => {
            if (res.isConfirmed) {
                deleteLogInStorage(index);
                // 갱신해주기
                setStorageLog(getLogInStorage());
            }
        })
    }

    return (
        <div className="list-group log-list">
            {storageLog.length > 0 ?
                storageLog.map((data, index) => (
                    <div key={index} className="log-item">
                        <a href={`#log${index}`} data-bs-toggle="collapse"
                            className="list-group-item list-group-item-action reinforce-log">
                            <table className="table table-bordered log-card">
                                <tbody>
                                    <tr>
                                        <td colSpan={3}><b>{data.title}</b></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>{getFormattedDate(data.date.toLocaleString())}</td>
                                        <td>목표: {data.setting.start}&nbsp;{">"}&nbsp;{data.setting.goal}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            총 강화 횟수 {data.total.success + data.total.failure + data.total.destroy}회<br />
                                            <SuccessBadge />&nbsp;{data.total.success}&nbsp;
                                            <FailureBadge />&nbsp;{data.total.failure}&nbsp;
                                            <DestroyBadge />&nbsp;{data.total.destroy}&nbsp;
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
                        <div className="collapse log-detail-div" id={`log${index}`}>
                            <ul className="list-group log-detail" >
                                {data.log.map((d, i) => (
                                    <li key={i} className="list-group-item">
                                        <table className="log-result-table">
                                            <tbody>
                                                <tr>
                                                    <td width={40}><b>{i + 1}</b></td>
                                                    <td>
                                                        {
                                                            d.result === Result.success ? <SuccessBadge />
                                                                : d.result === Result.failure ? <FailureBadge />
                                                                    : d.result === Result.destroy ? <DestroyBadge />
                                                                        : <span className="badge bg-info">??</span>
                                                        }
                                                        &nbsp;&nbsp;
                                                        {d.from}성 {">"} {d.to}성
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </li>
                                ))}
                            </ul>
                            <button className="btn btn-outline-secondary btn-sm shrinker" data-bs-target={`#log${index}`} data-bs-toggle="collapse">접기 ▲</button>
                        </div>
                        <i className="bi bi-x log-delbtn"
                            onClick={() => handleDeleteClick(index, data.title)}>

                        </i>
                    </div>
                ))
                : <div>저장된 데이터가 없습니다.</div>
            }
        </div>
    )
}

export default Log;