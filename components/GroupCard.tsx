import { Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { GroupCardProps } from "@/types/componentproptypes";

function GroupCard({ id, title, expenditure, currency }: GroupCardProps) {
    return (
        <TouchableOpacity onPress={()=> router.push(`/group/${id}`)}>
            <View className="bg-gray-200 px-3 w-full rounded-md mt-8 py-6 flex flex-row justify-between">
                <Text className="text-xl">{title}</Text>
                <Text className="text-xl text-right">
                    {currency + expenditure}
                </Text>
            </View>
        </TouchableOpacity>  
    );
}

export default GroupCard;
