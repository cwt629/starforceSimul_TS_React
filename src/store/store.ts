import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentState, InitialData } from "../type/state";
import { getMaximumStarByLevel } from "../utils/reinforce";

const initialState: CurrentState = {
    ready: false,
    level: 0,
    start: 0,
    goal: 0,
    maxStar: 0,
    restoreCost: BigInt(0),
    totalSpent: BigInt(0),
    success: 0,
    failure: 0,
    destroy: 0,
    currentStar: 0,
    nextCost: BigInt(0),
    nextSuccess: 0,
    nextFailure: 0,
    nextDestroy: 0,
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
        init: (state, action: PayloadAction<InitialData>) => {
            state = {
                ready: true,
                level: action.payload.level,
                start: action.payload.start,
                goal: action.payload.goal,
                maxStar: getMaximumStarByLevel(action.payload.level),
                restoreCost: BigInt(action.payload.restoreCost),
                totalSpent: BigInt(0),
                success: 0,
                failure: 0,
                destroy: 0,
                currentStar: 0,
                nextCost: BigInt(0),
                nextSuccess: 0,
                nextFailure: 0,
                nextDestroy: 0,
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