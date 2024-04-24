import { FunctionComponent } from "react";
import CategoryMenuOptions from "../components/CategoryMenuOptions";

export interface MenuOptionItem {
  id: string;
  label: string;
  icon: string;
}

export const MenuOptionsType = {
  select: "select",
  modal: "modal",
  custom: "custom",
} as const;

export type MenuOptionsType = keyof typeof MenuOptionsType;

export type MenuOptions =
  | {
      type: typeof MenuOptionsType.select;
      items: MenuOptionItem[];
    }
  | {
      type: typeof MenuOptionsType.custom;
      Component: FunctionComponent;
    };

export const OPTIONS_MAP: Record<string, MenuOptions> = {
  appearance: {
    type: MenuOptionsType.select,
    items: [
      {
        id: "dark",
        label: "Dark",
        icon: "moon",
      },
      {
        id: "light",
        label: "Light",
        icon: "sun",
      },
    ],
  },
  currency: {
    type: MenuOptionsType.select,
    items: [
      {
        id: "inr",
        label: "Rupee",
        icon: "indian-rupee-sign",
      },
      {
        id: "usd",
        label: "Dollar",
        icon: "dollar-sign",
      },
      {
        id: "eur",
        label: "Euro",
        icon: "euro-sign",
      },
      {
        id: "jpy",
        label: "Yen",
        icon: "yen-sign",
      },
      {
        id: "gbp",
        label: "Pound",
        icon: "sterling-sign",
      },
    ],
  },
  haptics: {
    type: MenuOptionsType.select,
    items: [
      {
        id: "none",
        label: "None",
        icon: "face-meh-blank",
      },
      {
        id: "mild",
        label: "Mild",
        icon: "face-grin",
      },
      {
        id: "strong",
        label: "Strong",
        icon: "face-grin-squint",
      },
    ],
  },
  categories: {
    type: MenuOptionsType.custom,
    Component: CategoryMenuOptions,
  },
};
