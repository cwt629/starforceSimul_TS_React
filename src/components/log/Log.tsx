import { useMemo, useState } from "react";
import { confirmWithSwal } from "../../utils/alert";
import { getFormattedDate } from "../../utils/dateformat";
import { deleteLogInStorage, getLogInStorage } from "../../utils/storage";
import DestroyBadge from "./badges/DestroyBadge";
import FailureBadge from "./badges/FailureBadge";
import SuccessBadge from "./badges/SuccessBadge";
import star_filled from "../../images/star_filled.png";
import { UserLog } from "../../type/storage";
import LogPagination from "./LogPagination";

const ELEMENTS_PER_PAGE = 2; // 페이지당 표시할 데이터 개수
const PAGES_PER_GROUP = 5; // 한 페이지그룹당 표시할 페이지 개수

function Log() {
  const [storageLog, setStorageLog] = useState<UserLog[]>(
    getLogInStorage().reverse()
  );
  const [page, setPage] = useState<number>(1);

  const filteredLogs: UserLog[] = useMemo(
    () =>
      storageLog.slice(
        (page - 1) * ELEMENTS_PER_PAGE,
        page * ELEMENTS_PER_PAGE
      ),
    [storageLog, page]
  );

  // 페이지를 기반으로 현재 그룹의 첫 페이지를 반환하는 함수
  const getPageGroupStart = (currentPage: number) =>
    Math.floor((currentPage - 1) / PAGES_PER_GROUP) * PAGES_PER_GROUP + 1;

  const pageGroup: number = Math.floor((page - 1) / PAGES_PER_GROUP);
  const maxPage: number = Math.ceil(storageLog.length / ELEMENTS_PER_PAGE);
  const maxPageGroup: number = Math.floor((maxPage - 1) / PAGES_PER_GROUP);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleNextPageGroup = () => {
    if (pageGroup >= maxPageGroup) return;
    // 다음 페이지그룹의 첫번째 페이지로 이동
    const nextPage = getPageGroupStart(page + PAGES_PER_GROUP);
    setPage(nextPage);
  };

  const handlePrevPageGroup = () => {
    if (pageGroup <= 0) return;
    // 이전 페이지그룹의 첫번째 페이지로 이동
    const nextPage = getPageGroupStart(page - PAGES_PER_GROUP);
    setPage(nextPage);
  };

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
      <LogPagination
        currentPage={page}
        currentGroupFrom={getPageGroupStart(page)}
        currentGroupTo={
          getPageGroupStart(page) + PAGES_PER_GROUP - 1 <= maxPage
            ? getPageGroupStart(page) + PAGES_PER_GROUP
            : maxPage + 1
        }
        handlePageChange={handlePageChange}
        handlePrevPageGroup={handlePrevPageGroup}
        handleNextPageGroup={handleNextPageGroup}
        isFirstPageGroup={pageGroup <= 0}
        isLastPageGroup={pageGroup >= maxPageGroup}
      />
      {filteredLogs.length > 0 ? (
        filteredLogs.map((data, index) => (
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
