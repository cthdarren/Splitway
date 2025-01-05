import { Text, Image, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { GroupCardProps } from "@/types/componentproptypes";

function GroupCard({ id, title, expenditure, currency }: GroupCardProps) {
  return (
    <TouchableOpacity onPress={() => router.push(`/group/${id}`)}>
      <View className="bg-gray-200 w-full rounded-md mt-5 flex flex-row justify-between items-center">
        <View className="rounded-full w-[60px] overflow-hidden mx-3">
          <Image
            source={require("@/assets/images/default_pic.png")}
            style={{ height: 60, width: 60 }}
            resizeMode="cover"
          />
        </View>
        <View className="pr-4 flex py-7 justify-evenly flex-grow">
          <Text className="text-xl font-bold pb-1">{title}</Text>
          <Text className="text-xl ">{currency + expenditure}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default GroupCard;
