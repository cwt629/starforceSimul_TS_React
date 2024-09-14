import { useHistory, useLocation, } from "react-router-dom";
import { AutoInterval } from "../type/auto";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function BreadCrumb() {
    const { pathname } = useLocation();
    const history = useHistory();
    const autoIntervalID: AutoInterval = useSelector((state: RootState) => (state.autoIntervalID));

    // 특정 tab을 눌렀을 때, 해당 링크로 이동하게 하는 이벤트
    const handleClickTab = (link: string) => {
        history.push(link);
    }

    return (
        <ul className="nav nav-pills nav-justified breadcrumb">
            <li className="nav-item">
                <span className={`nav-link ${pathname === "/" ? "active" : ""} ${autoIntervalID ? 'disabled' : ''}`} onClick={() => handleClickTab("/")}>시뮬레이션</span>
            </li>
            <li className="nav-item">
                <span className={`nav-link ${pathname === "/log" ? "active" : ""} ${autoIntervalID ? 'disabled' : ''}`} onClick={() => handleClickTab("/log")}>나의 강화 기록</span>
            </li>
        </ul>
    )
}

export default BreadCrumb;