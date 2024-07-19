import { useState } from "react";
import { InitialData } from "../type/state";
import { init } from "../store/store";
import { useDispatch } from "react-redux";

function Setting() {
    const [level, setLevel] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [restoreCost, setRestoreCost] = useState("0");

    const dispatch = useDispatch();

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
            <table>
                <tr>
                    <td>장비 레벨 *</td>
                    <td colSpan={2}>
                        <input type="text" name="level" placeholder="ex) 150, 160, 200, 250"
                            value={level} maxLength={3}
                            onChange={(e) => setLevel(e.target.value)} /> 레벨
                    </td>
                </tr>
                <tr>
                    <td rowSpan={2}>시뮬레이션 목표 *</td>
                    <td>시작</td>
                    <td>목표</td>
                </tr>
                <tr>
                    <td><input type="text" name="starfrom" value={from} placeholder="0~24 정수" maxLength={2}
                        onChange={(e) => setFrom(e.target.value)} />성</td>
                    <td><input type="text" name="starto" value={to} placeholder="1~25 정수" maxLength={2}
                        onChange={(e) => setTo(e.target.value)} />성</td>
                </tr>
                <tr>
                    <td>장비 복구 비용</td>
                    <td colSpan={2}>
                        <input type="text" name="restorecost" value={restoreCost}
                            onChange={(e) => setRestoreCost(e.target.value)} /> 메소
                        <div className="explain">복구 비용은 선택 사항이며, 0메소로 입력 시 파괴된 장비의 개수로 결과가 안내됩니다.</div>
                    </td>
                </tr>
            </table>
            <button type="submit">시작</button>
        </form>
    )
}

export default Setting;