import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function LeaderBoard() {
    const ready = useSelector((state: RootState) => (state.ready));

    return (
        <div style={{ display: (ready) ? 'inline-block' : 'none' }}>
            준비됨!
        </div>
    )
}

export default LeaderBoard;