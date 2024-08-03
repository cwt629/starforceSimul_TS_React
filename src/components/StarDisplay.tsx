import { useSelector } from "react-redux";
import { CurrentState } from "../type/state";

import star_filled from '../images/star_filled.png';
import star_empty from '../images/star_empty.png';
import React from "react";

function StarDisplay() {
    const currentStar: number = useSelector((state: CurrentState) => (state.currentStar));
    const maxStar: number = useSelector((state: CurrentState) => (state.maxStar));

    const FULL_STAR_PROPS: React.ImgHTMLAttributes<HTMLImageElement> = {
        src: star_filled,
        className: 'star'
    };
    const EMPTY_STAR_PROPS: React.ImgHTMLAttributes<HTMLImageElement> = {
        src: star_empty,
        className: 'star'
    };

    const getStarInfo = (): boolean[][] => {
        let stars: boolean[] = [];
        for (let i = 0; i < maxStar; i++) {
            stars.push(i < currentStar);
        }

        // span 만들기
        let spanElements: boolean[][] = [];
        for (let i = 0; i < maxStar; i += 5) {
            spanElements.push(stars.slice(i, i + 5));
        }

        return spanElements;
    }

    return (<div className="star-div">
        {getStarInfo().map((arr, i) => (<span className="stars" key={i}>{
            arr.map((filled, index) => (filled ?
                <img key={index} alt="star_filled" {...FULL_STAR_PROPS} />
                : <img key={index} alt="star_empty" {...EMPTY_STAR_PROPS} />))
        }</span>))}
    </div>)
}

export default StarDisplay;