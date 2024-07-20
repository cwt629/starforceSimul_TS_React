import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentState, InitialData } from "../type/state";
import { getMaximumStarByLevel } from "../utils/reinforce";
import { getUpgradeCost } from "../utils/cost";

const reinforceData = require("../data/reinforce-data.json");

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
    cost: BigInt(0),
    successPercent: 0,
    failurePercent: 0,
    destroyPercent: 0,
    noStarcatch: false,
    preventDestroy: false,
    log: [],
    isChance: false,
    achieved: false,
    ableToFall: false
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
            state.cost = getUpgradeCost(action.payload.level, action.payload.start);
            state.successPercent = reinforceData.percentage[action.payload.start].success;
            state.destroyPercent = reinforceData.percentage[action.payload.start].destroy;
            state.failurePercent = 100 - state.successPercent - state.destroyPercent;
            state.noStarcatch = false;
            state.preventDestroy = false;
            state.log = [];
            state.isChance = false;
            state.achieved = false;
            state.ableToFall = !reinforceData.keeplevel[action.payload.start]
        }
    }
});

export const { init } = simulSlice.actions;

export const store = configureStore({
    reducer: simulSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatcher = typeof store.dispatch;