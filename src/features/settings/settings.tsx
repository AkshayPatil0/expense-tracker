import { useMemo } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { StyleSheet } from "react-native";
import Header from "./components/Header";
import { MenuItem, SETTINGS_MENU } from "./constants/menu";
import SettingsMenu from "./components/SettingsMenu";
import SafeScrollView from "@/components/layout/SafeScrollView";
import { useSettingsStore } from "./store/settings-store";
import { MenuOptionsType, OPTIONS_MAP } from "./constants/options";
import MenuOptionsWrapper from "./components/MenuOptionsWrapper";
import MenuOptionsSelect from "./components/MenuOptionsSelect";

const MenuBySection = Object.entries(
  SETTINGS_MENU.reduce<Record<string, MenuItem[]>>((res, item) => {
    const section = item.section;
    return {
      ...res,
      [section]: [...(res[section] || []), item],
    };
  }, {})
).map(([section, items]) => ({
  section,
  items,
}));

export default function SettingsPage() {
  const { selectedMenu: selectedMenuId } = useSettingsStore();

  const MENUS = useMemo(
    () =>
      MenuBySection.map((menu) => (
        <SettingsMenu items={menu.items} key={menu.section} />
      )),
    []
  );

  const selectedMenu = useMemo(() => {
    const menu = SETTINGS_MENU.find((item) => item.id === selectedMenuId);
    const options = OPTIONS_MAP[selectedMenuId];
    if (!options || !menu) return null;
    return { menu, options };
  }, [selectedMenuId]);

  const OPTIONS = useMemo(() => {
    if (!selectedMenu) return null;

    switch (selectedMenu.options.type) {
      case MenuOptionsType.select:
        return (
          <MenuOptionsWrapper menuLabel={selectedMenu.menu.label}>
            <MenuOptionsSelect options={selectedMenu.options.items} />
          </MenuOptionsWrapper>
        );
      case MenuOptionsType.custom:
        return (
          <MenuOptionsWrapper menuLabel={selectedMenu.menu.label}>
            <selectedMenu.options.Component />
          </MenuOptionsWrapper>
        );
    }
  }, [selectedMenu]);

  return (
    <>
      <TopBar useSafeArea>
        <Header />
      </TopBar>
      <SafeScrollView>{selectedMenu ? OPTIONS : MENUS}</SafeScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
