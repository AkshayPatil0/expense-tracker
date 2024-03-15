export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface CategoryStore {
  categories: Array<Category>;
  addCategory: (category: Category) => void;
  editCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;
}
