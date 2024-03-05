import { useMemo } from "react";
import { create } from "zustand";
// Define interface for expense data
export interface AddPendingExpenseInput {
  amount: number;
}

export interface PendingExpenseInputStore {
  input: AddPendingExpenseInput;
  setInput: <K extends keyof AddPendingExpenseInput>(
    key: K,
    value: AddPendingExpenseInput[K]
  ) => void;
  resetInput: () => void;
}

const getInitialInputState = (): AddPendingExpenseInput => ({
  amount: 0,
});

export const usePendingExpenseInputStore = create<PendingExpenseInputStore>()(
  (set) => ({
    input: getInitialInputState(),
    setInput: <K extends keyof AddPendingExpenseInput>(
      key: K,
      value: AddPendingExpenseInput[K]
    ) => {
      set((state) => ({
        input: { ...state.input, [key]: value },
      }));
    },
    resetInput: () => set((state) => ({ input: getInitialInputState() })),
  })
);

export const usePendingExpenseInput = <K extends keyof AddPendingExpenseInput>(
  key: K
) => {
  const { input, setInput } = usePendingExpenseInputStore();

  const state = useMemo(() => input[key], [input[key]]);

  const setState = (value: AddPendingExpenseInput[K]) => {
    setInput(key, value);
  };

  return [state, setState] as const;
};
