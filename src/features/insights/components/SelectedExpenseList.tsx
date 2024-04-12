import ListExpensesByDay from "@/features/list-expenses/components/ListExpensesByDay";
import { useExpensesByTimeSpan } from "../hooks/useExpensesByTimeSpan";
import { useInsightsStore } from "../store/insights-store";

export default function SelectedExpenseList() {
  const { timeSpan, reference } = useInsightsStore();
  const expenses = useExpensesByTimeSpan(timeSpan, reference);

  return <ListExpensesByDay expenses={expenses} disableGestures />;
}
