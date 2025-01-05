import { Text, View, TouchableHighlight } from "react-native";
import { GroupCardProps } from "@/types/componentproptypes";
import strings from "@/i18n/en.json";
import { FontAwesome } from "@expo/vector-icons";
import { ReactNode } from "react";

function ScreenWrapper({ children }: { children: ReactNode }) {
    return (
        <View className="flex py-5 px-8 h-full">
            <View className="flex flex-row p-0 justify-between items-center">
                <Text className="text-3xl py-2">{strings.APP_NAME}</Text>
                <TouchableHighlight
                    underlayColor={"rgba(0, 0, 0, 0.0)"}
                    onPress={() => { }}>
                    <FontAwesome size={36} name="user-circle" />
                </TouchableHighlight>
            </View>
            {children}
        </View>
    );
}

export default ScreenWrapper;
