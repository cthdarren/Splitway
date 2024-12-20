import { useContext } from "react";
import { useCurrencyContext } from "../contexts/CurrencyContext";
import { Text, View, Pressable, TouchableOpacity } from "react-native";
import { Link, RelativePathString, router } from "expo-router";
import { navigate } from "expo-router/build/global-state/routing";

type GroupCardProps = {
    id: number;
    title: string;
    expenditure: string;
};

function GroupCard({ id, title, expenditure }: GroupCardProps) {
    const { currency, setCurrency } = useCurrencyContext();
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
