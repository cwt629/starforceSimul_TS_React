import { useState } from "react";
import { InitialData } from "../type/state";
import { Dispatcher, init, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { isValidGoal, isValidLevel, isValidRestoreCost, isValidStart } from "../utils/validate";
import { alertWithSwal, confirmWithSwal } from "../utils/alert";


function Setting() {
    const [level, setLevel] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [restoreCost, setRestoreCost] = useState("0");

    const ready: boolean = useSelector((state: RootState) => (state.ready));
    const dispatch: Dispatcher = useDispatch();

    // form 제출 이벤트
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validation에 따라 알림창 반환하기
        if (!isValidLevel(level)) {
            alertWithSwal({
                icon: 'error',
                text: '레벨 입력을 확인해주세요!',
                buttonClass: 'btn btn-danger'
            });
            return;
        }

        if (!isValidStart(level, from)) {
            alertWithSwal({
                icon: 'error',
                text: '시작 강화 단계를 확인해주세요!',
                buttonClass: 'btn btn-danger'
            });
            return;
        }

        if (!isValidGoal(level, from, to)) {
            alertWithSwal({
                icon: 'error',
                text: '목표 강화 단계를 확인해주세요!',
                buttonClass: 'btn btn-danger'
            });
            return;
        }

        if (!isValidRestoreCost(restoreCost)) {
            alertWithSwal({
                icon: 'error',
                text: '장비 복구 비용을 확인해주세요!',
                buttonClass: 'btn btn-danger'
            });
            return;
        }

        // 이미 강화가 진행되었다가 다시 시작하는 경우 확인
        if (ready) {
            const result = await confirmWithSwal({
                icon: 'warning',
                text: '현재 진행 중인 강화를 초기화하고 다시 강화를 시작하시겠습니까?',
                buttonClass: 'btn btn-primary mg-10',
                buttonClass2: 'btn btn-secondary mg-10'
            });
            if (!result.isConfirmed)
                return;
        }

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
            <table className="table table-bordered setting">
                <tbody>
                    <tr>
                        <td className="header" style={{ width: '30%' }}>장비 레벨 *</td>
                        <td colSpan={2}>
                            <div className="input-group" style={{ width: "90%" }}>
                                <input type="text" className="form-control" name="level" placeholder="ex) 150, 200"
                                    value={level} maxLength={3} required
                                    onChange={(e) => setLevel(e.target.value)}
                                />
                                <span className="input-group-text">레벨</span>
                            </div>
                            {
                                (level.length > 0 && !isValidLevel(level)) ?
                                    <div className="form-warn">레벨 입력이 올바르지 않거나 범위를 벗어났습니다.</div> : <></>
                            }

                        </td>
                    </tr>
                    <tr>
                        <td className="header" rowSpan={2}>시뮬레이션 목표 *</td>
                        <td style={{ width: '35%' }}>시작</td>
                        <td style={{ width: '35%' }}>목표</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="input-group" style={{ width: "80%" }}>
                                <input type="text" name="starfrom" className="form-control" value={from} placeholder="" maxLength={2} required
                                    onChange={(e) => setFrom(e.target.value)}
                                />
                                <span className="input-group-text">성</span>
                                {
                                    from.length > 0 && !isValidStart(level, from) ?
                                        <div className="form-warn">올바른 입력이 아닙니다.</div> : <></>
                                }
                            </div>
                        </td>
                        <td>
                            <div className="input-group" style={{ width: "80%" }}>
                                <input type="text" name="starto" className="form-control" value={to} placeholder="" maxLength={2} required
                                    onChange={(e) => setTo(e.target.value)}
                                />
                                <span className="input-group-text">성</span>
                                {
                                    to.length > 0 && !isValidGoal(level, from, to) ?
                                        <div className="form-warn">올바른 입력이 아닙니다.</div> : <></>
                                }
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="header">복구 비용</td>
                        <td colSpan={2}>
                            <div className="input-group" style={{ width: "80%" }}>
                                <input type="text" name="restorecost" className="form-control" value={restoreCost}
                                    onChange={(e) => setRestoreCost(e.target.value)} />
                                <span className="input-group-text">메소</span>
                            </div>
                            {
                                isValidRestoreCost(restoreCost) ? <div className="restore-cost-show">입력: {Number(restoreCost).toLocaleString()}메소</div>
                                    : <div className="form-warn restore-cost-show">복구 비용 입력이 올바르지 않습니다.</div>
                            }
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