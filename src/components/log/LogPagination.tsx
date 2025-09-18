interface Props {
  currentPage: number;
  currentGroupFrom: number;
  currentGroupTo: number;
  handlePageChange: (page: number) => void;
  handlePrevPageGroup: () => void;
  handleNextPageGroup: () => void;
  isFirstPageGroup: boolean;
  isLastPageGroup: boolean;
}

function LogPagination({
  currentPage,
  currentGroupFrom,
  currentGroupTo,
  handlePageChange,
  handlePrevPageGroup,
  handleNextPageGroup,
  isFirstPageGroup,
  isLastPageGroup,
}: Props) {
  return (
    <ul className="pagination log-pagination">
      <li
        className={`page-item ${isFirstPageGroup ? "disabled" : ""}`}
        onClick={handlePrevPageGroup}
      >
        <span className="page-link">이전</span>
      </li>

      {(() => {
        const elements = [];
        for (let i = currentGroupFrom; i < currentGroupTo; i++) {
          elements.push(
            <li
              key={`page${i}`}
              className={`page-item ${i === currentPage ? "active" : ""}`}
              onClick={() => handlePageChange(i)}
            >
              <span className="page-link">{i}</span>
            </li>
          );
        }

        return elements;
      })()}
      <li
        className={`page-item ${isLastPageGroup ? "disabled" : ""}`}
        onClick={handleNextPageGroup}
      >
        <span className="page-link">다음</span>
      </li>
    </ul>
  );
}

export default LogPagination;
