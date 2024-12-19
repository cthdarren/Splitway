import { useContext } from "react";
import CurrencyContext, {
    useCurrencyContext,
} from "../contexts/CurrencyContext";
import { Text, View, Pressable } from "react-native";

type GroupCardProps = {
    title: string;
    expenditure: string;
};

function GroupCard({ title, expenditure }: GroupCardProps) {
    const { currency, setCurrency } = useCurrencyContext();
    return (
        <Pressable className="px-5 py-8 bg-gray-200 rounded-md">
            <View className="flex flex-row">
                <Text className="w-1/2 text-xl">{title}</Text>
                <Text className="w-1/2 text-xl text-right">{currency + expenditure}</Text>
            </View>
        </Pressable>
    );
}

export default GroupCard;
