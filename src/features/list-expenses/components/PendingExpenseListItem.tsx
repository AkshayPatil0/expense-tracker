import { getIconByCategory } from "@/store/category";
import { Expense, PendingExpense } from "@/store/expenses";
import ListItem from "./ui/ListItem";
import { Icon, View } from "@/theme/components/Themed";
import { Pill } from "@/components/Pill";

export interface PendingExpenseListItemProps {
  expense: PendingExpense;
}

export default function PendingExpenseListItem(
  props: PendingExpenseListItemProps
) {
  const { expense } = props;
  return (
    <ListItem>
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
