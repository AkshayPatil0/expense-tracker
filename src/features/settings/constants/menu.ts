export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  section: string;
}

export const SETTINGS_MENU: MenuItem[] = [
  {
    id: "appearance",
    label: "Appearance",
    icon: "brush",
    section: "general",
  },
  {
    id: "currency",
    label: "Currency",
    icon: "coins",
    section: "general",
  },
  {
    id: "haptics",
    label: "Haptics",
    icon: "hand-pointer",
    section: "general",
  },
  {
    id: "categories",
    label: "Categories",
    icon: "icons",
    section: "data",
  },
  {
    id: "tags",
    label: "Tags",
    icon: "hashtag",
    section: "data",
  },
  {
    id: "import",
    label: "Import Data",
    icon: "file-import",
    section: "data",
  },
  {
    id: "export",
    label: "Export Data",
    icon: "file-export",
    section: "data",
  },
  {
    id: "reset",
    label: "Reset Data",
    icon: "trash",
    section: "data",
  },
];
