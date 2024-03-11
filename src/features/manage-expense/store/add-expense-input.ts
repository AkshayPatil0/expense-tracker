import {
  InputStore,
  inputStoreFactory,
  useInput,
} from "@/store/utils/input-store";
import { create } from "zustand";
// Define interface for expense data
export interface AddExpenseInput {
  date: Date;
  amount: number;
  note: string;
  category: string;
  tags: string[];
}

export type AddExpenseInputStore = InputStore<AddExpenseInput>;

const getInitialInputState = (): AddExpenseInput => ({
  date: new Date(),
  amount: 0,
  note: "",
  category: "",
  tags: [],
});

export const useAddExpenseInputStore = create<AddExpenseInputStore>()(
  inputStoreFactory(getInitialInputState)
);

export const useAddExpenseInput = useInput(useAddExpenseInputStore);
