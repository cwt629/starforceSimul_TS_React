import BreadCrumb from "../components/BreadCrumb";
import LeaderBoard from "../components/LeaderBoard";
import Options from "../components/Options";
import Setting from "../components/Setting";
import Title from "../components/Title";

function RouterMain() {
    return (
        <div className="App">
            <Title />
            <BreadCrumb />
            <Setting />
            <Options />
            <LeaderBoard />
        </div>
    )
}

export default RouterMain;