import { useState } from "react";
import { confirmWithSwal } from "../../utils/alert";
import { getFormattedDate } from "../../utils/dateformat";
import { deleteLogInStorage, getLogInStorage } from "../../utils/storage";
import DestroyBadge from "./badges/DestroyBadge";
import FailureBadge from "./badges/FailureBadge";
import SuccessBadge from "./badges/SuccessBadge";
import star_filled from "../../images/star_filled.png";

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
                    <b style={{ wordBreak: "break-all" }}>{data.title}</b>
                    <div className="datetime">
                      {getFormattedDate(data.date.toLocaleString())}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Lv.{data.setting.level}</td>
                  <td>
                    <div className="star-goal">
                      <img
                        alt="star"
                        src={star_filled}
                        className="star"
                        style={{ margin: "0 4px" }}
                      />
                      {data.setting.start}&nbsp;
                      {">"}&nbsp;
                      <img
                        alt="star"
                        src={star_filled}
                        className="star"
                        style={{ margin: "0 4px" }}
                      />
                      {data.setting.goal}
                    </div>
                  </td>
                  <td>
                    <i
                      className="bi bi-x-circle log-delbtn"
                      onClick={() => handleDeleteClick(index, data.title)}
                    ></i>
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}>
                    총{" "}
                    <b>
                      {data.total.success +
                        data.total.failure +
                        data.total.destroy}
                    </b>
                    회 강화
                    <br />
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
                    총 비용: <b>{BigInt(data.total.cost).toLocaleString()}</b>
                    메소
                    <br />
                    (복구 비용 설정:{" "}
                    {BigInt(data.setting.restoreCost).toLocaleString()}메소)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div>저장된 데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default Log;
