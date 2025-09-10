export type UserLog = {
  title: string;
  date: Date;
  setting: {
    level: number;
    start: number;
    goal: number;
    restoreCost: bigint;
  };
  total: {
    success: number;
    failure: number;
    destroy: number;
    cost: bigint;
  };
};
