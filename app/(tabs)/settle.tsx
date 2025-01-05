import { View, Text, StyleSheet } from "react-native";
import strings from "@/i18n/en.json";
import ScreenWrapper from "@/components/ScreenWrapper";

export default function Tab() {
    return (
        <ScreenWrapper>
            <View></View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
