import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
function getGroupData(id: number) {
  return {
    name: "Japan Trip",
    currency: "JPY",
    expenditure: 500,
    members: [
      {
        id: 1,
        name: "Darren",
      },
      {
        id: 2,
        name: "Jason",
      },
      { id: 3, name: "Pin Kang" },
    ],
  };
}
export default function Group() {
  const params = useLocalSearchParams();
  if (typeof params.id === "string") {
    const data = getGroupData(parseInt(params.id));
    return (
      <View className="px-3 py-5 h-full">
        <Text className="text-3xl font-bold pb-5">{data.name}</Text>
        <Text className="mt-5">
          Total Expenditure: {data.expenditure + " " + data.currency}
        </Text>
        <Text className="text-xl font-bold mt-5">Members</Text>
        {data.members.map((member) => (
          <Text>{member.name}</Text>
        ))}
      </View>
    );
  } else {
    //route to 404 page
  }
}
