import strings from "@/i18n/en.json";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useThemeContext } from "@/contexts/ThemeContext";
export default function Tab() {
    const { theme, setTheme } = useThemeContext();
    var toChange = strings.LIGHT_THEME_NAME;
    if (theme == strings.LIGHT_THEME_NAME) {
        toChange = strings.DARK_THEME_NAME;
    }

    return (
        <View className="flex py-5 px-8 h-full">
            <Text className="text-3xl">{strings.APP_NAME}</Text>
            <Text className="font-bold text-2xl mt-10">
                {strings.SETTINGS_HEADER}
            </Text>
            <ScrollView className="flex flex-col py-5">
                <View className="flex flex-row justify-between">
                    <Text className="text-lg">{strings.CHANGE_THEME_SETTING}</Text>
                    <Button
                        onPress={() => {
                            setTheme(toChange);
                        }}
                        title={toChange}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
