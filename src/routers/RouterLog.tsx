import BreadCrumb from "../components/BreadCrumb";
import Log from "../components/log/Log";
import LogNotice from "../components/log/LogNotice";
import Title from "../components/Title";
import '../styles/Log.css';

function RouterLog() {
    return (
        <div className="App">
            <Title />
            <BreadCrumb />
            <LogNotice />
            <Log />
        </div>
    )
}

export default RouterLog;