import GroupCard from "@/components/GroupCard";
import strings from "@/i18n/en.json";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Text, View, Button, ScrollView } from "react-native";

type groupData = {
  id: number;
  name: string;
  expenditure: number;
  currency: string;
};

type returnData = {
  data: groupData[];
};

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
  const { theme, setTheme } = useThemeContext();

  const data: groupData[] = getGroupsData();
  var toChange = "light";
  if (theme == "light") {
    toChange = "dark";
  }
  return (
    <View className="flex py-5 px-8 h-full">
      <Text className="text-3xl">{strings.APP_NAME}</Text>
      <Text className="font-bold text-2xl mt-10">{strings.GROUPS_HEADER}</Text>
      <ScrollView className="py-5">
        {data.map((x) => (
          <GroupCard key={x.id} id={x.id} title={x.name} expenditure={x.expenditure} currency={x.currency} />
        ))}
      </ScrollView>
      <Button
        onPress={() => {
          setTheme(toChange);
        }}
        title={toChange}
      />
    </View>
  );
}
