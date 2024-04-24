import { create } from "zustand";
// Define interface for expense data

export const TIME_SPAN = {
  week: "week",
  month: "month",
  year: "year",
} as const;

export type TimeSpan = keyof typeof TIME_SPAN;

export interface InsightsStore {
  timeSpan: TimeSpan;
  reference: Date;
  setTimeSpan: (timeSpan: TimeSpan) => void;
  setReference: (reference: Date) => void;
}

export const useInsightsStore = create<InsightsStore>()((set, get) => ({
  timeSpan: TIME_SPAN.week,
  reference: new Date(),
  setTimeSpan(timeSpan) {
    set({ timeSpan });
  },
  setReference(reference) {
    set({ reference: reference });
  },
}));
