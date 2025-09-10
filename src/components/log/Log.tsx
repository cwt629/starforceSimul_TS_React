import { useState } from "react";
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
      icon: "warning",
      text: `삭제된 데이터는 복구할 수 없습니다.\n정말 해당 로그를 삭제하시겠습니까?\n제목: ${title}`,
      buttonClass: "btn btn-danger mg-10",
      buttonClass2: "btn btn-secondary mg-10",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteLogInStorage(index);
        // 갱신해주기
        setStorageLog(getLogInStorage());
      }
    });
  };

  return (
    <div className="list-group log-list">
      {storageLog.length > 0 ? (
        storageLog.map((data, index) => (
          <div key={index} className="log-item">
            <table className="table table-bordered log-card">
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <b>{data.title}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {getFormattedDate(data.date.toLocaleString())}
                  </td>
                  <td>
                    목표: {data.setting.start}&nbsp;{">"}&nbsp;
                    {data.setting.goal}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    총 강화 횟수{" "}
                    {data.total.success +
                      data.total.failure +
                      data.total.destroy}
                    회<br />
                    <SuccessBadge />
                    &nbsp;{data.total.success}&nbsp;
                    <FailureBadge />
                    &nbsp;{data.total.failure}&nbsp;
                    <DestroyBadge />
                    &nbsp;{data.total.destroy}&nbsp;
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    총 {BigInt(data.total.cost).toLocaleString()}메소 소모
                    <br />
                    (복구 비용 설정:{" "}
                    {BigInt(data.setting.restoreCost).toLocaleString()}메소)
                  </td>
                </tr>
              </tbody>
            </table>

            <i
              className="bi bi-x log-delbtn"
              onClick={() => handleDeleteClick(index, data.title)}
            ></i>
          </div>
        ))
      ) : (
        <div>저장된 데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default Log;
