import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentState, InitialData } from "../type/state";
import { getMaximumStarByLevel, isPreventableStar } from "../utils/reinforce";
import { getActualCost, getUpgradeCost } from "../utils/cost";
import { Result } from "../type/result";
import { isChance } from "../utils/chance";
import { saveLogOnStorage } from "../utils/storage";
import { UserLog } from "../type/storage";
import { MVPRank } from "../type/discount";

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
    successOnFives: false
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
        },
        // 성공 처리
        grantSuccess: (state) => {
            // log 저장
            state.log.push({ result: Result.success, from: state.currentStar, to: state.currentStar + 1, fallen: false });
            state.totalSpent += state.cost;
            state.totalSuccess++;
            state.currentStar++;
            state.originalCost = getUpgradeCost(state.level, state.currentStar);


            // 최대 강화 단계 미만인 경우만 설정
            if (state.currentStar < state.maxStar) {
                state.successPercent = reinforceData.percentage[state.currentStar].success;
                state.destroyPercent = reinforceData.percentage[state.currentStar].destroy;
                state.failurePercent = 100 - state.successPercent - state.destroyPercent;
                state.ableToFall = !reinforceData.keeplevel[state.currentStar];
            }

            // // 파괴방지로 들어가는 penalty
            // let preventPenalty: bigint = BigInt((isPreventableStar(state.currentStar) && state.destroyPercent > 0 && state.preventDestroy) ? 2 : 1);
            // state.cost = state.originalCost * preventPenalty;
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
            state.originalCost = getUpgradeCost(state.level, state.currentStar);
            state.successPercent = reinforceData.percentage[state.currentStar].success;
            state.destroyPercent = reinforceData.percentage[state.currentStar].destroy;
            state.failurePercent = 100 - state.successPercent - state.destroyPercent;
            state.ableToFall = !reinforceData.keeplevel[state.currentStar];

            // 찬스타임 구현
            if (isChance(state.log)) {
                state.successPercent = 100;
                state.failurePercent = 0;
                state.destroyPercent = 0;
            }

            // // 파괴방지로 들어가는 penalty
            // let preventPenalty: bigint = BigInt((isPreventableStar(state.currentStar) && state.destroyPercent > 0 && state.preventDestroy) ? 2 : 1);
            // state.cost = state.originalCost * preventPenalty;
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
            state.originalCost = getUpgradeCost(state.level, state.currentStar);
            // // 파괴방지로 들어가는 penalty
            // let preventPenalty: bigint = BigInt((isPreventableStar(state.currentStar) && state.destroyPercent > 0 && state.preventDestroy) ? 2 : 1);
            // state.cost = state.originalCost * preventPenalty;
            state.successPercent = reinforceData.percentage[state.currentStar].success;
            state.destroyPercent = reinforceData.percentage[state.currentStar].destroy;
            state.failurePercent = 100 - state.successPercent - state.destroyPercent;
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
            saveLogOnStorage(userLog);
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
        }
    }
});

export const { init, grantSuccess, grantFailure, grantDestroy, setStarcatch, setPreventDestroy, saveResult, setMVPRank } = simulSlice.actions;

export const store = configureStore({
    reducer: simulSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;