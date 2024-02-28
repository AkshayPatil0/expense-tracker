import { useMemo } from "react";
import { create } from "zustand";
// Define interface for expense data
export interface AddExpenseInput {
  date: Date;
  amount: number;
  note: string;
  category: string;
  tags: string[];
}

export interface AddExpenseInputStore {
  input: AddExpenseInput;
  setInput: <K extends keyof AddExpenseInput>(
    key: K,
    value: AddExpenseInput[K]
  ) => void;
}

export const useAddExpenseInputStore = create<AddExpenseInputStore>()(
  (set) => ({
    input: {
      date: new Date(),
      amount: 0,
      note: "",
      category: "",
      tags: [],
    },
    setInput: <K extends keyof AddExpenseInput>(
      key: K,
      value: AddExpenseInput[K]
    ) => {
      set((state) => ({ input: { ...state.input, [key]: value } }));
    },
  })
);

export const useAddExpenseInput = <K extends keyof AddExpenseInput>(key: K) => {
  const { input, setInput } = useAddExpenseInputStore();

  const state = useMemo(() => input[key], [input[key]]);

  const setState = (value: AddExpenseInput[K]) => {
    setInput(key, value);
  };

  return [state, setState] as const;
};
