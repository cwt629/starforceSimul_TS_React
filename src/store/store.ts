import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentState, InitialData } from "../type/state";
import { getMaximumStarByLevel } from "../utils/reinforce";
import { getActualCost, getUpgradeCost } from "../utils/cost";
import { Result } from "../type/result";
import { isChance } from "../utils/chance";
import { saveLogOnStorage } from "../utils/storage";
import { UserLog } from "../type/storage";
import { MVPRank } from "../type/discount";
import { AutoInterval } from "../type/auto";

const reinforceData = require("../data/reinforce-data.json");
const STAR_WHEN_DESTROYED: number = 12; // 파괴될 시 이동되는 단계

const initialState: CurrentState = {
    ready: false,
    level: 0,
    start: 0,
    goal: 0,
    maxStar: 0,
    restoreCost: BigInt(0),
    totalSpent: BigInt(0),
    totalSuccess: 0,
    totalFailure: 0,
    totalDestroy: 0,
    currentStar: 0,
    nextStar: 0,
    originalCost: BigInt(0),
    cost: BigInt(0),
    successPercent: 0,
    failurePercent: 0,
    destroyPercent: 0,
    noStarcatch: false,
    preventDestroy: false,
    log: [],
    achieved: false,
    ableToFall: false,
    autoSaved: false,
    mvpRank: MVPRank.bronze,
    pcRoomApplied: false,
    bonusUnderTen: false,
    eventDC30: false,
    successOnFives: false,
    autoIntervalID: null
};

const simulSlice = createSlice({
    name: 'simul',
    initialState,
    reducers: {
        // 초기 설정 완료 시 호출되는 함수
        init: (state, action: PayloadAction<InitialData>) => {
            state.ready = true;
            state.level = action.payload.level;
            state.start = action.payload.start;
            state.goal = action.payload.goal;
            state.maxStar = getMaximumStarByLevel(action.payload.level);
            state.restoreCost = BigInt(action.payload.restoreCost);
            state.totalSpent = BigInt(0);
            state.totalSuccess = 0;
            state.totalFailure = 0;
            state.totalDestroy = 0;
            state.currentStar = action.payload.start;
            state.nextStar = action.payload.start + 1;
            state.originalCost = getUpgradeCost(action.payload.level, action.payload.start);
            state.cost = state.originalCost;
            // 최대 강화 단계 미만인 경우만 설정
            if (state.currentStar < state.maxStar) {
                state.successPercent = reinforceData.percentage[action.payload.start].success;
                state.destroyPercent = reinforceData.percentage[action.payload.start].destroy;
                state.failurePercent = 100 - state.successPercent - state.destroyPercent;
                state.ableToFall = !reinforceData.keeplevel[action.payload.start]
            }
            state.noStarcatch = false;
            state.preventDestroy = false;
            state.log = [];
            state.achieved = false;
            state.autoSaved = false;
            state.mvpRank = MVPRank.bronze;
            state.pcRoomApplied = false;
            state.bonusUnderTen = false;
            state.eventDC30 = false;
            state.successOnFives = false;
            state.autoIntervalID = null;
        },
        // 성공 처리
        grantSuccess: (state) => {
            // log 저장
            state.log.push({ result: Result.success, from: state.currentStar, to: state.currentStar + 1, fallen: false });
            state.totalSpent += state.cost;
            state.totalSuccess++;
            state.currentStar = state.nextStar;
            // 10성 이하 1+1 강화가 체크되어 있는 경우를 고려한다
            state.nextStar = (state.bonusUnderTen && state.currentStar <= 10) ? state.currentStar + 2 : state.currentStar + 1;
            state.originalCost = getUpgradeCost(state.level, state.currentStar);


            // 최대 강화 단계 미만인 경우만 설정
            if (state.currentStar < state.maxStar) {
                // 확률 적용
                if (state.successOnFives && [5, 10, 15].includes(state.currentStar)) {
                    state.successPercent = 100;
                    state.failurePercent = 0;
                    state.destroyPercent = 0;
                }
                else {
                    state.successPercent = reinforceData.percentage[state.currentStar].success;
                    state.destroyPercent = reinforceData.percentage[state.currentStar].destroy;
                    state.failurePercent = 100 - state.successPercent - state.destroyPercent;
                }
                state.ableToFall = !reinforceData.keeplevel[state.currentStar];
            }

            state.cost = getActualCost({
                originalCost: state.originalCost,
                currentStar: state.currentStar,
                destroyPercent: state.destroyPercent,
                preventDestroy: state.preventDestroy,
                mvpRank: state.mvpRank,
                pcRoomApplied: state.pcRoomApplied,
                eventDC30: state.eventDC30
            });

            // 목표 달성 시
            if (!state.achieved && state.currentStar === state.goal) {
                state.achieved = true;
            }
        },
        // 실패 처리
        grantFailure: (state) => {
            const nextStar: number = (state.ableToFall) ? state.currentStar - 1 : state.currentStar;
            // log 저장
            state.log.push({
                result: Result.failure, from: state.currentStar,
                to: nextStar, fallen: state.ableToFall
            });
            state.totalSpent += state.cost;
            state.totalFailure++;
            state.currentStar = nextStar;
            // 10성 이하 1+1 강화가 체크되어 있는 경우를 고려한다
            state.nextStar = (state.bonusUnderTen && state.currentStar <= 10) ? state.currentStar + 2 : state.currentStar + 1;
            state.originalCost = getUpgradeCost(state.level, state.currentStar);
            // 확률 적용
            if (state.successOnFives && [5, 10, 15].includes(state.currentStar)) {
                state.successPercent = 100;
                state.failurePercent = 0;
                state.destroyPercent = 0;
            }
            else {
                state.successPercent = reinforceData.percentage[state.currentStar].success;
                state.destroyPercent = reinforceData.percentage[state.currentStar].destroy;
                state.failurePercent = 100 - state.successPercent - state.destroyPercent;
            }
            state.ableToFall = !reinforceData.keeplevel[state.currentStar];

            // 찬스타임 구현
            if (isChance(state.log)) {
                state.successPercent = 100;
                state.failurePercent = 0;
                state.destroyPercent = 0;
            }

            // // 파괴방지로 들어가는 penalty
            state.cost = getActualCost({
                originalCost: state.originalCost,
                currentStar: state.currentStar,
                destroyPercent: state.destroyPercent,
                preventDestroy: state.preventDestroy,
                mvpRank: state.mvpRank,
                pcRoomApplied: state.pcRoomApplied,
                eventDC30: state.eventDC30
            });
        },
        // 파괴 처리
        grantDestroy: (state) => {
            // log 저장
            state.log.push({ result: Result.destroy, from: state.currentStar, to: STAR_WHEN_DESTROYED, fallen: false });
            state.totalSpent += state.cost + state.restoreCost;
            state.totalDestroy++;
            state.currentStar = STAR_WHEN_DESTROYED;
            // 10성 이하 1+1 강화가 체크되어 있는 경우를 고려한다
            state.nextStar = (state.bonusUnderTen && state.currentStar <= 10) ? state.currentStar + 2 : state.currentStar + 1;
            state.originalCost = getUpgradeCost(state.level, state.currentStar);
            // 확률 적용
            if (state.successOnFives && [5, 10, 15].includes(state.currentStar)) {
                state.successPercent = 100;
                state.failurePercent = 0;
                state.destroyPercent = 0;
            }
            else {
                state.successPercent = reinforceData.percentage[state.currentStar].success;
                state.destroyPercent = reinforceData.percentage[state.currentStar].destroy;
                state.failurePercent = 100 - state.successPercent - state.destroyPercent;
            }
            state.ableToFall = !reinforceData.keeplevel[state.currentStar];
            state.cost = getActualCost({
                originalCost: state.originalCost,
                currentStar: state.currentStar,
                destroyPercent: state.destroyPercent,
                preventDestroy: state.preventDestroy,
                mvpRank: state.mvpRank,
                pcRoomApplied: state.pcRoomApplied,
                eventDC30: state.eventDC30
            });
        },
        // 스타캐치 해제 체크 처리
        setStarcatch: (state, action: PayloadAction<boolean>) => {
            state.noStarcatch = action.payload;
        },
        // 파괴방지 체크 처리
        setPreventDestroy: (state, action: PayloadAction<boolean>) => {
            state.preventDestroy = action.payload;

            state.cost = getActualCost({
                originalCost: state.originalCost,
                currentStar: state.currentStar,
                destroyPercent: state.destroyPercent,
                preventDestroy: state.preventDestroy,
                mvpRank: state.mvpRank,
                pcRoomApplied: state.pcRoomApplied,
                eventDC30: state.eventDC30
            });
        },
        // 현재 강화 데이터 저장
        saveResult: (state, action: PayloadAction<string>) => {
            let userLog: UserLog = {
                title: action.payload,
                date: new Date(),
                log: state.log,
                setting: {
                    level: state.level,
                    start: state.start,
                    goal: state.goal,
                    restoreCost: state.restoreCost
                },
                total: {
                    success: state.totalSuccess,
                    failure: state.totalFailure,
                    destroy: state.totalDestroy,
                    cost: state.totalSpent
                }
            };
            if (!state.autoSaved) saveLogOnStorage(userLog);
            state.autoSaved = true;
        },
        // mvp 체크
        setMVPRank: (state, action: PayloadAction<MVPRank>) => {
            state.mvpRank = action.payload;
            state.cost = getActualCost({
                originalCost: state.originalCost,
                currentStar: state.currentStar,
                destroyPercent: state.destroyPercent,
                preventDestroy: state.preventDestroy,
                mvpRank: state.mvpRank,
                pcRoomApplied: state.pcRoomApplied,
                eventDC30: state.eventDC30
            });
        },
        // PC방 혜택 적용 체크
        setPCRoomBonus: (state, action: PayloadAction<boolean>) => {
            state.pcRoomApplied = action.payload;
            state.cost = getActualCost({
                originalCost: state.originalCost,
                currentStar: state.currentStar,
                destroyPercent: state.destroyPercent,
                preventDestroy: state.preventDestroy,
                mvpRank: state.mvpRank,
                pcRoomApplied: state.pcRoomApplied,
                eventDC30: state.eventDC30
            });
        },
        // 10성 이하 강화 시 1+1 적용 체크
        setBonusUnderTen: (state, action: PayloadAction<boolean>) => {
            state.bonusUnderTen = action.payload;
            // 10성 이하 1+1 강화가 체크되어 있는 경우를 고려한다
            state.nextStar = (state.bonusUnderTen && state.currentStar <= 10) ? state.currentStar + 2 : state.currentStar + 1;
        },
        // 강화 비용 30% 할인 체크
        setEventDC30: (state, action: PayloadAction<boolean>) => {
            state.eventDC30 = action.payload;
            state.cost = getActualCost({
                originalCost: state.originalCost,
                currentStar: state.currentStar,
                destroyPercent: state.destroyPercent,
                preventDestroy: state.preventDestroy,
                mvpRank: state.mvpRank,
                pcRoomApplied: state.pcRoomApplied,
                eventDC30: state.eventDC30
            });
        },
        // 5, 10, 15성에서 강화 성공 100% 체크
        setSuccessOnFives: (state, action: PayloadAction<boolean>) => {
            state.successOnFives = action.payload;
            // 확률 적용
            if (state.successOnFives && [5, 10, 15].includes(state.currentStar)) {
                state.successPercent = 100;
                state.failurePercent = 0;
                state.destroyPercent = 0;
            }
            else {
                state.successPercent = reinforceData.percentage[state.currentStar].success;
                state.destroyPercent = reinforceData.percentage[state.currentStar].destroy;
                state.failurePercent = 100 - state.successPercent - state.destroyPercent;
            }

            // 확률 변동에 따라 cost 재계산(파괴방지에 의한 패널티 추가/제거 위함)
            state.cost = getActualCost({
                originalCost: state.originalCost,
                currentStar: state.currentStar,
                destroyPercent: state.destroyPercent,
                preventDestroy: state.preventDestroy,
                mvpRank: state.mvpRank,
                pcRoomApplied: state.pcRoomApplied,
                eventDC30: state.eventDC30
            });
        },
        // 샤이닝 스타포스(5, 10, 15에서 100% + 강화 비용 30% 할인) 적용
        setShiningStarforce: (state) => {
            state.successOnFives = true;
            state.eventDC30 = true;
            state.bonusUnderTen = false; // 온전히 샤이닝스타포스만 적용하기 위함

            // 확률 적용
            if (state.successOnFives && [5, 10, 15].includes(state.currentStar)) {
                state.successPercent = 100;
                state.failurePercent = 0;
                state.destroyPercent = 0;
            }
            else {
                state.successPercent = reinforceData.percentage[state.currentStar].success;
                state.destroyPercent = reinforceData.percentage[state.currentStar].destroy;
                state.failurePercent = 100 - state.successPercent - state.destroyPercent;
            }

            // 확률 변동에 따라 cost 재계산(파괴방지에 의한 패널티 추가/제거 위함)
            state.cost = getActualCost({
                originalCost: state.originalCost,
                currentStar: state.currentStar,
                destroyPercent: state.destroyPercent,
                preventDestroy: state.preventDestroy,
                mvpRank: state.mvpRank,
                pcRoomApplied: state.pcRoomApplied,
                eventDC30: state.eventDC30
            });
        },
        // 자동 강화 interval 관리
        setAutoIntervalID: (state, action: PayloadAction<AutoInterval>) => {
            state.autoIntervalID = action.payload;
        }
    }
});

export const { init, grantSuccess, grantFailure, grantDestroy, setStarcatch, setPreventDestroy, saveResult,
    setMVPRank, setPCRoomBonus, setBonusUnderTen, setEventDC30, setSuccessOnFives, setShiningStarforce, setAutoIntervalID
} = simulSlice.actions;

export const store = configureStore({
    reducer: simulSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;