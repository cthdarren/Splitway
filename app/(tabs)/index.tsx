import GroupCard from "@/components/GroupCard";
import strings from "@/i18n/en.json";
import { Text, View, Button, ScrollView } from "react-native";
import { groupData, returnData } from "@/types/networkresponses";

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
    <View className="flex py-5 px-8 h-full">
      <Text className="text-3xl">{strings.APP_NAME}</Text>
      <Text className="font-bold text-2xl mt-10">{strings.GROUPS_HEADER}</Text>
      <ScrollView className="py-5">
        {data.map((x) => (
          <GroupCard key={x.id} id={x.id} title={x.name} expenditure={x.expenditure} currency={x.currency} />
        ))}
      </ScrollView>
    </View>
  );
}
