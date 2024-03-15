import {
  InputStore,
  inputStoreFactory,
  useInput,
} from "@/providers/input-store/store/input-store";
import { create } from "zustand";
// Define interface for expense data
export interface AddExpenseInput {
  date: Date;
  amount: number;
  note: string;
  categoryId: number;
  tags: string[];
}

export type AddExpenseInputStore = InputStore<AddExpenseInput>;

const getInitialInputState = (): AddExpenseInput => ({
  date: new Date(),
  amount: 0,
  note: "",
  categoryId: -1,
  tags: [],
});

export const useAddExpenseInputStore = create<AddExpenseInputStore>()(
  inputStoreFactory(getInitialInputState)
);

export const useAddExpenseInput = useInput(useAddExpenseInputStore);
