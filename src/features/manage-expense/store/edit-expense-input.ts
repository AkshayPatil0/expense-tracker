import {
  InputStore,
  inputStoreFactory,
  useInput,
} from "@/providers/input-store/store/input-store";
import { create } from "zustand";
// Define interface for expense data
export interface EditExpenseInput {
  date: Date;
  amount: number;
  note: string;
  categoryId: number;
  tags: string[];
}

export type AddExpenseInputStore = InputStore<EditExpenseInput>;

const getInitialInputState = (): EditExpenseInput => ({
  date: new Date(),
  amount: 0,
  note: "",
  categoryId: -1,
  tags: [],
});

export const useEditExpenseInputStore = create<AddExpenseInputStore>()(
  inputStoreFactory(getInitialInputState)
);

export const useEditExpenseInput = useInput(useEditExpenseInputStore);
