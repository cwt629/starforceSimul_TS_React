export enum Result {
    success,
    failure,
    destroy
};

export interface ResultExpectation {
    success: number,
    failure: number,
    destroy: number
};