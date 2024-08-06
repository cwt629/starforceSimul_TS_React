import { useLocation, useNavigate } from "react-router-dom";

function BreadCrumb() {
    const { pathname } = useLocation();
    const nav = useNavigate();

    // 특정 tab을 눌렀을 때, 해당 링크로 이동하게 하는 이벤트
    const handleClickTab = (link: string) => {
        nav(link);
    }

    return (
        <ul className="nav nav-pills nav-justified breadcrumb">
            <li className="nav-item">
                <span className={`nav-link ${pathname === "/" ? "active" : ""}`} onClick={() => handleClickTab("/")}>시뮬레이션</span>
            </li>
            <li className="nav-item">
                <span className={`nav-link ${pathname === "/log" ? "active" : ""}`} onClick={() => handleClickTab("/log")}>나의 강화 기록</span>
            </li>
        </ul>
    )
}

export default BreadCrumb;