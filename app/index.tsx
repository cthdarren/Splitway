import GroupCard from "@/components/GroupCard";
import strings from "../i18n/en.json"
import { useThemeContext } from "@/contexts/ThemeContext";
import { Text, View, Button, ScrollView } from "react-native";

export default function Index() {
    const {theme, setTheme} = useThemeContext();
    var toChange = 'light'
    if (theme == 'light'){
        toChange = 'dark'
    }
    return (
        <View className="flex py-5 px-8 h-full">
            <Text className="text-3xl">{strings.APP_NAME}</Text>
            <Text className="font-bold text-2xl mt-10">{strings.GROUPS_HEADER}</Text>
            <ScrollView className="py-5">
                <GroupCard title={"Japan Trip"} expenditure={"500"}/>

            </ScrollView>
            <Button onPress={()=> {setTheme(toChange)}} title={toChange}/>
        </View>
    );
}
