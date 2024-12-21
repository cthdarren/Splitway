import GroupCard from "@/components/GroupCard";
import strings from "@/i18n/en.json";
import { Text, View, ScrollView } from "react-native";
import { groupData, returnData } from "@/types/networkresponses";
import { Link } from "expo-router";

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
      <View className="flex flex-row justify-between">
        <Text className="font-bold text-2xl mt-10">
          {strings.GROUPS_HEADER}
        </Text>
        <Link href={"/group/create"} className="text-lg mt-10 color-blue-500">
          {strings.CREATE_GROUP_BUTTON}
        </Link>
      </View>
      <ScrollView className="py-5">
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
    </View>
  );
}
