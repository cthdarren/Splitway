import GroupCard from "@/components/GroupCard";
import strings from "@/i18n/en.json";
import { Text, View, ScrollView, TouchableHighlight } from "react-native";
import { groupData, returnData } from "@/types/networkresponses";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import ScreenWrapper from "@/components/ScreenWrapper";

function getGroupsData() {
    const data: returnData = {
        data: [
            {
                id: 1,
                name: "Japan Trip",
                expenditure: 500,
                currency: "JPY",
            },
            {
                id: 2,
                name: "Korea Trip",
                expenditure: 500,
                currency: "KRW",
            },
            {
                id: 3,
                name: "Abisko, Sweden",
                expenditure: 100233,
                currency: "SEK",
            },
        ],
    };

    return data.data;
}

export default function Index() {
    const data: groupData[] = getGroupsData();

    return (
        <ScreenWrapper>
            <View className="flex flex-row justify-between">
                <Text className="font-bold text-2xl mt-10 pb-3">
                    {strings.GROUPS_HEADER}
                </Text>
                <Link href={"/group/create"} className="text-lg mt-7 pt-3 pb-3 color-blue-500">
                    {strings.CREATE_GROUP_BUTTON}
                </Link>
            </View>
            <ScrollView className="py-2">
                {data.map((x) => (
                    <GroupCard
                        key={x.id}
                        id={x.id}
                        title={x.name}
                        expenditure={x.expenditure}
                        currency={x.currency}
                    />
                ))}
            </ScrollView>
        </ScreenWrapper>
    );
}
