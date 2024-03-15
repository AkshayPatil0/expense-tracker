import { StyleSheet } from "react-native";
import { ScrollView, Text, View } from "@/theme/components/Themed";
import { Pill } from "@/components/Pill";
import { useCategoryStore } from "@/store/category/store";
import { tags } from "@/store/tag";
import { EXPENSE_TYPE, useExpenseFilters } from "@/store/expenses";
import { Badge } from "@/components/Badge";

export interface TopBarProps {
  disabled?: boolean;
}

export function FilterBar(props: TopBarProps) {
  const { categories } = useCategoryStore();
  const [selectedCategories, setSelectedCategories] =
    useExpenseFilters("categories");
  const [selectedTags, setSelectedTags] = useExpenseFilters("tags");

  const types = Object.values(EXPENSE_TYPE);
  return (
    <View style={styles.root}>
      <FilterSelector
        label="Category"
        items={categories.map<FilterSelectorProps<number>["items"][0]>(
          (cat) => ({
            key: cat.id,
            value: `${cat.icon} ${cat.name}`,
          })
        )}
        selectedKeys={selectedCategories}
        onSelect={(key) => setSelectedCategories([...selectedCategories, key])}
        onDeselect={(key) =>
          setSelectedCategories(selectedCategories.filter((k) => k !== key))
        }
      />
      <FilterSelector
        label="Tags"
        items={tags.map((tag) => ({
          key: tag,
          value: tag,
        }))}
        selectedKeys={selectedTags}
        onSelect={(key) => setSelectedTags([...selectedTags, key])}
        onDeselect={(key) =>
          setSelectedTags(selectedTags.filter((k) => k !== key))
        }
      />
    </View>
  );
}

interface FilterSelectorProps<V> {
  label: string;
  items: { key: V; value: string }[];
  selectedKeys: V[];
  onSelect: (key: V) => void;
  onDeselect: (key: V) => void;
}

function FilterSelector<V extends string | number>(
  props: FilterSelectorProps<V>
) {
  const selectedItems = props.items.filter((a) =>
    props.selectedKeys.includes(a.key)
  );
  const remainingItems = props.items.filter(
    (a) => !props.selectedKeys.includes(a.key)
  );
  return (
    <View style={styles.filterContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.label}</Text>
        {!!selectedItems.length && (
          <Badge badge={selectedItems.length} size={18} top={-4} right={-4} />
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 4,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {selectedItems.map((item) => (
          <Pill
            value={item.value}
            key={item.key}
            onClose={
              props.selectedKeys.includes(item.key)
                ? () => props.onDeselect(item.key)
                : undefined
            }
            background={"background2"}
          />
        ))}
        {!!selectedItems.length && <Text style={{ fontSize: 20 }}>|</Text>}
        {remainingItems.map((item) => (
          <Pill
            value={item.value}
            key={item.key}
            onPress={() => props.onSelect(item.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // width: "100%",
    paddingTop: 10,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  labelContainer: {
    paddingRight: 8,
  },
  label: {
    fontWeight: "600",
  },
});
