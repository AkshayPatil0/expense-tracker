import { getIconByCategory } from "@/store/category";
import { Expense } from "@/store/expenses";
import ListItem from "./ui/ListItem";
import { View } from "@/theme/components/Themed";
import { IconButton } from "@/components/IconButton";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

export interface ExpenseListItemProps {
  expense: Expense;
  onDelete: (id: number) => void;
}

export default function ExpenseListItem(props: ExpenseListItemProps) {
  const { expense } = props;

  return (
    <ListItem
      onDelete={() => props.onDelete(expense.id)}
      onPress={() => router.navigate(`edit-expense?id=${expense.id}`)}
    >
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

const styles = StyleSheet.create({});
