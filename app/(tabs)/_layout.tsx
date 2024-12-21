import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "blue",
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Groups",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="group" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settle"
                options={{
                    title: "Settle",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="credit-card" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={20} name="cog" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
