import { getIconByCategory } from "@/store/category";
import { Expense, PendingExpense } from "@/store/expenses";
import ListItem from "./ui/ListItem";
import { Icon, View } from "@/theme/components/Themed";
import { Pill } from "@/components/Pill";
import { router } from "expo-router";

export interface PendingExpenseListItemProps {
  expense: PendingExpense;
  onDelete: (id: number) => void;
}

export default function PendingExpenseListItem(
  props: PendingExpenseListItemProps
) {
  const { expense } = props;
  return (
    <ListItem
      onDelete={() => props.onDelete(expense.id)}
      onPress={() => router.navigate(`edit-expense?id=${expense.id}`)}
    >
      <ListItem.IconContainer background="warning2">⏳</ListItem.IconContainer>
      <ListItem.NoteTimeContainer>
        <ListItem.NoteContainer
          color="disabledText"
          italic
        >{`Paid to ${expense.paidTo}`}</ListItem.NoteContainer>
        <ListItem.TimeContainer>{expense.date}</ListItem.TimeContainer>
      </ListItem.NoteTimeContainer>
      <ListItem.AmountContainer color="disabledText">
        {expense.amount}
      </ListItem.AmountContainer>
    </ListItem>
  );
}
