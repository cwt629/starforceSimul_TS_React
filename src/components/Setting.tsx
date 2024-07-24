import { useState } from "react";
import { InitialData } from "../type/state";
import { Dispatcher, init } from "../store/store";
import { useDispatch } from "react-redux";

function Setting() {
    const [level, setLevel] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [restoreCost, setRestoreCost] = useState("0");

    const dispatch: Dispatcher = useDispatch();

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const initialSet: InitialData = {
            level: Number(level),
            start: Number(from),
            goal: Number(to),
            restoreCost: Number(restoreCost)
        };

        dispatch(init(initialSet));
    }

    return (
        <form className="setting" onSubmit={(e) => handleFormSubmit(e)}>
            <h3>시뮬레이션 설정</h3>
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td width={150}>장비 레벨 *</td>
                        <td colSpan={2}>
                            <div className="input-group" style={{ width: "300px" }}>
                                <input type="text" className="form-control" name="level" placeholder="ex) 150, 160, 200, 250"
                                    value={level} maxLength={3} required
                                    onChange={(e) => setLevel(e.target.value)}
                                />
                                <span className="input-group-text">레벨</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>시뮬레이션 목표 *</td>
                        <td>시작</td>
                        <td>목표</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="input-group" style={{ width: "150px" }}>
                                <input type="text" name="starfrom" className="form-control" value={from} placeholder="0~24 정수" maxLength={2} required
                                    onChange={(e) => setFrom(e.target.value)}
                                />
                                <span className="input-group-text">성</span>
                            </div>
                        </td>
                        <td>
                            <div className="input-group" style={{ width: "150px" }}>
                                <input type="text" name="starto" className="form-control" value={to} placeholder="1~25 정수" maxLength={2} required
                                    onChange={(e) => setTo(e.target.value)}
                                />
                                <span className="input-group-text">성</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>복구 비용</td>
                        <td colSpan={2}>
                            <div className="input-group" style={{ width: "300px" }}>
                                <input type="text" name="restorecost" className="form-control" value={restoreCost}
                                    onChange={(e) => setRestoreCost(e.target.value)} />
                                <span className="input-group-text">메소</span>
                            </div>
                            <div className="explain">0메소로 입력 시 파괴된 장비의 개수로 결과가 안내됩니다.</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="btn btn-success">시작</button>
        </form>
    )
}

export default Setting;