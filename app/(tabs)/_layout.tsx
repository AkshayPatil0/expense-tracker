import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/theme/constants/Colors";
import { useColorScheme } from "@/theme/hooks/useColorScheme";
import { useClientOnlyValue } from "@/theme/hooks/useClientOnlyValue";
import { FontAwesome6 } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  color: string;
}) {
  return <FontAwesome6 size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarInactiveBackgroundColor: Colors[colorScheme].background,
        tabBarActiveBackgroundColor: Colors[colorScheme].background,
        tabBarShowLabel: false,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // headerShown: useClientOnlyValue(false, true),
        headerShown: false,
        headerTransparent: true,
        headerTitle: () => null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="receipt" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="chart-line" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-square" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
