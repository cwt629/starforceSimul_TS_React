import BreadCrumb from "../components/BreadCrumb";
import LeaderBoard from "../components/LeaderBoard";
import Setting from "../components/Setting";
import Title from "../components/Title";

function RouterMain() {
    return (
        <div className="App">
            <Title />
            <BreadCrumb />
            <Setting />
            <LeaderBoard />
        </div>
    )
}

export default RouterMain;