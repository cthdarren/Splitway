import BackButton from "@/components/BackButton";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
      <View className="h-full">
        <View className="bg-[#ee9999]">
          <View className="px-8 py-5 flex flex-row items-center justify-between">
            <BackButton />
            <TouchableOpacity className="pb-5 pt-2">
              <Text className="text-xl">Manage</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-[#ee9999]">
          <Text className="px-8 text-3xl font-bold pb-5">{data.name}</Text>
          <Text className="px-8 my-5 text-xl">
            Total Expenditure: <Text className="text-xl font-bold">{data.expenditure + " " + data.currency}</Text>
          </Text>
          <ScrollView
            id="actionBar"
            horizontal
            className="my-5 border-top px-8">
            <Text className="border px-4 py-2 mr-5 border-black rounded-md">Add expense</Text>
            <Text className="border px-4 py-2 mr-5 border-black rounded-md">Settle</Text>
            <Text className="border px-4 py-2 mr-5 border-black rounded-md">Manage members</Text>
          </ScrollView>
        </View>
        <View>
          <Text className="text-xl font-bold mt-5">Members</Text>
          {data.members.map((member) => (
            <Text key={member.id}>{member.name}</Text>
          ))}
        </View>
      </View>
    );
  } else {
    //route to 404 page
  }
}
