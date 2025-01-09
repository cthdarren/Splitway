import { Text, Image, View, TouchableOpacity } from "react-native";
import { ExpenseData } from "@/types/networkresponses";
import { Entypo } from "@expo/vector-icons";

function ExpenseCard({ expense }: { expense: ExpenseData }) {
    return (
        <View className="w-full pt-2 px-3 flex justify-between border-b border-inactive">
            <Text className="text-sm pb-3">{expense.dateCreated.toDateString()}</Text>
            <View className="flex pb-6 flex-row justify-between w-full items-center">
                <Text numberOfLines={1} className="text-lg">
                    {expense.expenseName}
                </Text>
                <Text className="flex-grow text-right pr-5  font-bold text-lg">
                    {expense.expenseAmount}
                </Text>
                <Entypo name="dots-three-vertical" size={14} />
            </View>
        </View>
    );
}

export default ExpenseCard;
