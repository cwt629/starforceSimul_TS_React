import { useSelector } from "react-redux";
import { CurrentState } from "../type/state";

function StarDisplay() {
    const currentStar: number = useSelector((state: CurrentState) => (state.currentStar));
    const maxStar: number = useSelector((state: CurrentState) => (state.maxStar));

    const FULL_STAR = "★";
    const EMPTY_STAR = "☆";

    const generateStarDisplay = () => {
        let stars: string[] = [];
        for (let i = 0; i < maxStar; i++) {
            stars.push(i < currentStar ? FULL_STAR : EMPTY_STAR);
        }

        // span 만들기
        let spanElements: string[] = [];
        for (let i = 0; i < maxStar; i += 5) {
            spanElements.push(stars.slice(i, i + 5).join(""));
        }

        return spanElements;
    }

    return (<div className="star-div">
        {generateStarDisplay().map((star, i) => (<><span className="star">{star}</span>{i === 2 ? <br /> : <></>}</>))}
    </div>)
}

export default StarDisplay;