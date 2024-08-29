import { useDispatch, useSelector } from "react-redux";
import { Dispatcher, RootState, setMVPRank, setPCRoomBonus } from "../store/store";
import { MVPRank } from "../type/discount";
import React from "react";

function Options() {
    const ready: boolean = useSelector((state: RootState) => (state.ready));
    const mvpRank: MVPRank = useSelector((state: RootState) => (state.mvpRank));
    const pcRoomApplied: boolean = useSelector((state: RootState) => (state.pcRoomApplied));
    const dispatch: Dispatcher = useDispatch();

    // mvp 할인 적용에 대한 이벤트 핸들러
    const handleMVPClick = (mvp: MVPRank): void => {
        dispatch(setMVPRank(mvp));
    }

    // PC방 혜택 적용에 대한 이벤트 핸들러
    const handlePCRoomClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked: boolean = event.target.checked;
        dispatch(setPCRoomBonus(checked));
    }

    return (
        ready ?
            <div className="options">
                <div className="simul-options">
                    <span className="options-category">비용 할인 옵션</span>
                    <div className="discount-options">
                        <table className="table table-bordered option-table">
                            <tbody>
                                <tr>
                                    <td><b>MVP 할인</b></td>
                                    <td>
                                        <div className="discount-options-mvp">
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="nomvp" name="mvp" checked={mvpRank === MVPRank.bronze}
                                                    onClick={() => handleMVPClick(MVPRank.bronze)} />
                                                <label className="form-check-label" htmlFor="nomvp">브론즈</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="mvpsilver" name="mvp" checked={mvpRank === MVPRank.silver}
                                                    onClick={() => handleMVPClick(MVPRank.silver)} />
                                                <label className="form-check-label" htmlFor="mvpsilver">실버</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="mvpgold" name="mvp" checked={mvpRank === MVPRank.gold}
                                                    onClick={() => handleMVPClick(MVPRank.gold)} />
                                                <label className="form-check-label" htmlFor="mvpgold">골드</label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="mvpdiared" name="mvp" checked={mvpRank === MVPRank.dia || mvpRank === MVPRank.red}
                                                    onClick={() => handleMVPClick(MVPRank.dia)} />
                                                <label className="form-check-label" htmlFor="mvpdiared">다이아,레드</label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>PC방 할인</b></td>
                                    <td>
                                        <div className="discount-options-pcroom">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="pccheck" checked={pcRoomApplied}
                                                    onChange={(e) => handlePCRoomClick(e)} />
                                                <label className="form-check-label" htmlFor="pccheck">PC방 혜택 적용</label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="simul-options">
                    <span className="options-category">이벤트 옵션</span>
                    <div className="event-options">
                        <div>
                            <button className="btn btn-sm btn-outline-secondary">샤이닝 스타포스 적용</button>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="plusone_under_10" />
                            <label className="form-check-label" htmlFor="plusone_under_10">10성 이하 강화 시 1+1</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="dc_30" />
                            <label className="form-check-label" htmlFor="dc_30">강화 비용 30% 할인</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="success_5_10_15" />
                            <label className="form-check-label" htmlFor="success_5_10_15">5, 10, 15성에서 강화 성공 100%</label>
                        </div>
                    </div>
                </div>
            </div> : <></>
    )
}

export default Options;