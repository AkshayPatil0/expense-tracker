import { getIconByCategory } from "@/store/category";
import { Expense } from "@/store/expenses";
import ListItem from "./ui/ListItem";

export interface ExpenseListItemProps {
  expense: Expense;
}

export default function ExpenseListItem(props: ExpenseListItemProps) {
  const { expense } = props;
  return (
    <ListItem>
      <ListItem.IconContainer>
        {getIconByCategory(expense.category)}
      </ListItem.IconContainer>
      <ListItem.NoteTimeContainer>
        <ListItem.NoteContainer>{expense.note}</ListItem.NoteContainer>
        <ListItem.TimeContainer>{expense.date}</ListItem.TimeContainer>
      </ListItem.NoteTimeContainer>
      <ListItem.AmountContainer>{expense.amount}</ListItem.AmountContainer>
    </ListItem>
  );
}
