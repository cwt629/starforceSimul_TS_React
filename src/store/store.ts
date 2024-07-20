import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentState, InitialData } from "../type/state";
import { getMaximumStarByLevel } from "../utils/reinforce";

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
    achieved: false
};

const simulSlice = createSlice({
    name: 'simul',
    initialState,
    reducers: {
        // 초기 설정 완료 시 호출되는 함수
        init: (state, action: PayloadAction<InitialData>) => {
            state = {
                ready: true,
                level: action.payload.level,
                start: action.payload.start,
                goal: action.payload.goal,
                maxStar: getMaximumStarByLevel(action.payload.level),
                restoreCost: BigInt(action.payload.restoreCost),
                totalSpent: BigInt(0),
                totalSuccess: 0,
                totalFailure: 0,
                totalDestroy: 0,
                currentStar: action.payload.start,
                cost: BigInt(0),
                successPercent: 0,
                failurePercent: 0,
                destroyPercent: 0,
                noStarcatch: false,
                preventDestroy: false,
                log: [],
                isChance: false,
                achieved: false
            };
            console.log(state);
        }
    }
});

export const { init } = simulSlice.actions;

export const store = configureStore({
    reducer: {
        simul: simulSlice.reducer
    }
});