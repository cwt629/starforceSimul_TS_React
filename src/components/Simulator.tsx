import { useDispatch, useSelector } from "react-redux";
import { Dispatcher, grantDestroy, grantFailure, grantSuccess, RootState, saveResult, setAutoIntervalID, setPreventDestroy, setStarcatch } from "../store/store";
import { Result, ResultExpectation } from "../type/result";
import { getExpectationByStarcatch, getReinforceResult, isPreventableStar } from "../utils/reinforce";
import React, { useEffect, useState } from "react";
import { alertWithSwal, confirmWithSwal } from "../utils/alert";
import { UserLog } from "../type/storage";
import { LogData } from "../type/state";
import { finishAndGetTitle } from "../utils/storage";
import { AutoInterval, AutoOption } from "../type/auto";

function Simulator() {
    const ready: boolean = useSelector((state: RootState) => (state.ready));
    const currentStar: number = useSelector((state: RootState) => (state.currentStar));
    const maxStar: number = useSelector((state: RootState) => (state.maxStar));
    const successPercent: number = useSelector((state: RootState) => (state.successPercent));
    const destroyPercent: number = useSelector((state: RootState) => (state.destroyPercent));
    const noStarcatch: boolean = useSelector((state: RootState) => (state.noStarcatch));
    const preventDestroy: boolean = useSelector((state: RootState) => (state.preventDestroy));
    const achieved: boolean = useSelector((state: RootState) => (state.achieved));
    const log: LogData[] = useSelector((state: RootState) => (state.log));
    const level: number = useSelector((state: RootState) => (state.level));
    const start: number = useSelector((state: RootState) => (state.start));
    const goal: number = useSelector((state: RootState) => (state.goal));
    const restoreCost: bigint = useSelector((state: RootState) => (state.restoreCost));
    const totalSuccess: number = useSelector((state: RootState) => (state.totalSuccess));
    const totalFailure: number = useSelector((state: RootState) => (state.totalFailure));
    const totalDestroy: number = useSelector((state: RootState) => (state.totalDestroy));
    const totalSpent: bigint = useSelector((state: RootState) => (state.totalSpent));
    const autoSaved: boolean = useSelector((state: RootState) => (state.autoSaved));
    const autoIntervalID: AutoInterval = useSelector((state: RootState) => (state.autoIntervalID));
    const dispatch: Dispatcher = useDispatch();

    const [autoMode, setAutoMode] = useState<boolean>(false); // 수동/자동 강화 모드를 boolean으로 선언
    const [autoInterval, setAutoInterval] = useState<number>(1000); // 자동 강화 속도

    // 자동 강화 속도 옵션들
    const autoSpeedOptions: AutoOption[] = [{ interval: 1000, name: '매우 느리게' }, { interval: 500, name: '느리게' },
    { interval: 200, name: '보통' }, { interval: 100, name: '빠르게' }, { interval: 50, name: '매우 빠르게' }
    ];

    useEffect(() => {
        if (achieved && !autoSaved) {
            let currentLog: UserLog = {
                title: '',
                date: new Date(),
                log: log,
                setting: {
                    level: level,
                    start: start,
                    goal: goal,
                    restoreCost: restoreCost
                },
                total: {
                    success: totalSuccess,
                    failure: totalFailure,
                    destroy: totalDestroy,
                    cost: totalSpent
                }
            };

            finishAndGetTitle(currentLog)
                .then((title: string) => {
                    dispatch(saveResult(title));
                    alertWithSwal({
                        icon: 'success',
                        text: '강화 내역이 저장되었습니다!\n나의 강화 기록 탭에서 확인하실 수 있습니다.',
                        buttonClass: 'btn btn-success'
                    });
                    setAutoMode(false); // 완료된 후에는 자동 강화가 불가하게 한다
                })
        }
    }, [achieved])

    useEffect(() => {
        // 자동 강화 도중 목표 달성 시 자동 강화 종료
        if (autoIntervalID && currentStar >= goal) {
            stopAutoReinforce();
            return;
        }
        // 이전 interval 정리
        if (!autoIntervalID) return;
        if (autoIntervalID) {
            clearInterval(autoIntervalID);
        }

        // 상태값이 변경될 때마다 interval 새로 설정
        const intervalID = window.setInterval(handleReinforceClick, autoInterval);
        dispatch(setAutoIntervalID(intervalID));

        // 컴포넌트 언마운트 시 interval 정리
        return () => {
            if (autoIntervalID) {
                clearInterval(autoIntervalID);
            }
        }
    }, [autoInterval, currentStar, goal, successPercent, destroyPercent, noStarcatch, preventDestroy]);

    // 등록된 interval을 정지하는 함수
    const stopAutoReinforce = () => {
        if (autoIntervalID) {
            clearInterval(autoIntervalID);
            dispatch(setAutoIntervalID(null));
        }
    }

    // 스타캐치 해제 체크박스 클릭 이벤트
    const handleStarCatch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        dispatch(setStarcatch(checked));
    }

    // 파괴방지 체크박스 클릭 이벤트
    const handlePreventDestroy = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        dispatch(setPreventDestroy(checked));
    }

    // 강화하기 버튼 클릭 이벤트
    const handleReinforceClick = () => {
        // 이미 최대 강화 단계인 경우
        if (currentStar >= maxStar) {
            alertWithSwal({ icon: 'info', text: '이미 최대 강화 단계에 도달했습니다.', buttonClass: 'btn btn-primary' });
            return;
        }

        // 현재 적용되는 확률 정보
        let currentExp: ResultExpectation = {
            success: successPercent,
            failure: 0,
            destroy: (isPreventableStar(currentStar) && preventDestroy) ? 0 : destroyPercent // 파괴방지 적용
        };
        currentExp.failure = 100 - currentExp.success - currentExp.destroy;

        // 실제로 적용될 확률 정보
        let finalExp: ResultExpectation = getExpectationByStarcatch(currentExp, !noStarcatch);

        const result: Result = getReinforceResult(finalExp.success, finalExp.destroy);
        switch (result) {
            case Result.success:
                dispatch(grantSuccess());
                break;

            case Result.failure:
                dispatch(grantFailure());
                break;

            case Result.destroy:
                dispatch(grantDestroy());
                break;
        }
    }

    // 수동/자동 모드 변경
    const handleModeChange = (autoMode: boolean) => {
        setAutoMode(autoMode);
    }

    // 자동 모드 - 강화 속도 변경
    const handleAutoSpeedChange = (speed: number) => {
        setAutoInterval(speed);
    }

    // 자동 강화 시작 버튼 클릭 이벤트
    const handleAutoStartClick = async () => {
        const result = await confirmWithSwal({
            icon: 'warning',
            text: `${goal}성까지 강화를 시작할까요?\n자동 강화 중엔 옵션 변경이 불가하며\n강화는 중간에 중지할 수 있습니다.`,
            buttonClass: 'btn btn-primary',
            buttonClass2: 'btn btn-secondary'
        });
        if (result.isDenied) return;

        const intervalID: number = window.setInterval(() => {
            handleReinforceClick(); // 강화 버튼을 누른 처리
        }, autoInterval);
        dispatch(setAutoIntervalID(intervalID));
    }

    // 자동 강화 중지 버튼 클릭 이벤트
    const handleAutoPauseClick = () => {
        if (autoIntervalID) {
            stopAutoReinforce();
        }
    }

    return (ready ?
        <div className="simulator">
            <ul className="nav nav-tabs nav-justified simul-tabs">
                <li className="nav-item">
                    <span className={`nav-link ${autoMode ? '' : 'active'} ${autoIntervalID ? 'disabled' : ''}`}
                        onClick={() => handleModeChange(false)}>직접 강화</span>
                </li>
                <li className="nav-item">
                    <span className={`nav-link ${autoMode ? 'active' : ''} ${achieved || autoIntervalID ? 'disabled' : ''}`}
                        onClick={() => handleModeChange(true)}>자동 강화</span>
                </li>
            </ul>
            {
                autoMode ?
                    <div className="simul-ingame">
                        <div className="auto-option-block">
                            <div className="simul-options option-ingame">
                                <span className="options-category">인게임 옵션</span>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="starcatch"
                                        checked={noStarcatch}
                                        onChange={(e) => handleStarCatch(e)} />
                                    <label className="form-check-label" htmlFor="starcatch">스타캐치 해제</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="destroyShield"
                                        checked={preventDestroy}
                                        onChange={(e) => handlePreventDestroy(e)} />
                                    <label className="form-check-label" htmlFor="destroyShield">파괴방지</label>
                                </div>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">강화 속도</span>
                                <select className="form-select" onChange={(e) => handleAutoSpeedChange(Number(e.target.value))} defaultValue={autoInterval}>
                                    {
                                        autoSpeedOptions.map((option, i) => <option key={i} value={option.interval} >{option.name}(1초당 {(1000 / option.interval).toFixed(1)}회)</option>)
                                    }
                                </select>
                            </div>

                            {
                                autoIntervalID ?
                                    <div className="auto-prevention-block">
                                        <div className="auto-prevention-paper"></div>
                                        <div className="auto-prevention-text">
                                            자동 강화 진행 중 <span className="spinner-border text-primary auto-spinner"></span>
                                        </div>
                                    </div>
                                    : <></>
                            }

                        </div>


                        {
                            autoIntervalID ?
                                <button type="button" className="btn btn-primary"
                                    onClick={handleAutoPauseClick}>강화 중지 <i className="bi bi-pause-fill"></i>
                                </button>
                                : <button type="button" className={`btn btn-primary ${achieved ? 'disabled' : ''}`}
                                    onClick={handleAutoStartClick}>강화 시작 <i className="bi bi-caret-right-fill"></i>
                                </button>
                        }

                    </div>
                    :
                    <div className="simul-ingame">
                        <div className="manual-option-block">
                            <div className="simul-options option-ingame">
                                <span className="options-category">인게임 옵션</span>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="starcatch"
                                        checked={noStarcatch}
                                        onChange={(e) => handleStarCatch(e)} />
                                    <label className="form-check-label" htmlFor="starcatch">스타캐치 해제</label>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="destroyShield"
                                        checked={preventDestroy}
                                        onChange={(e) => handlePreventDestroy(e)} disabled={destroyPercent === 0 || !isPreventableStar(currentStar)} />
                                    <label className="form-check-label" htmlFor="destroyShield">파괴방지</label>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-outline-primary"
                            onClick={handleReinforceClick}>강화하기</button>
                    </div>
            }

        </div> : <></>
    )
}

export default Simulator;