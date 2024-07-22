import { useSelector } from "react-redux";
import { CurrentState } from "../type/state";

function Simulator() {
    const ready: boolean = useSelector((state: CurrentState) => (state.ready));

    return (ready ?
        <div>
            <button type="button" className="btn btn-outline-primary">강화</button>
        </div> : <></>
    )
}

export default Simulator;