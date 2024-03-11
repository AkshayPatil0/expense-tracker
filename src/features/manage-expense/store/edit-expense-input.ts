import {
  InputStore,
  inputStoreFactory,
  useInput,
} from "@/store/utils/input-store";
import { create } from "zustand";
// Define interface for expense data
export interface EditExpenseInput {
  date: Date;
  amount: number;
  note: string;
  category: string;
  tags: string[];
}

export type AddExpenseInputStore = InputStore<EditExpenseInput>;

const getInitialInputState = (): EditExpenseInput => ({
  date: new Date(),
  amount: 0,
  note: "",
  category: "",
  tags: [],
});

export const useEditExpenseInputStore = create<AddExpenseInputStore>()(
  inputStoreFactory(getInitialInputState)
);

export const useEditExpenseInput = useInput(useEditExpenseInputStore);
