import BackButton from "@/components/BackButton";
import ExpenseCard from "@/components/ExpenseCard";
import { ExpenseData, GroupData } from "@/types/networkresponses";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";


const getExpenseData = (groupId: number): ExpenseData[] => {
};

export default function Group() {
    const [groupData, setGroupData] = useState<GroupData>();
    const [expenseData, setExpenseData] = useState<ExpenseData[]>();
    const [loading, setLoading] = useState<Boolean>();
    const [groupId, setGroupId] = useState<number>();

    const params = useLocalSearchParams();
    useEffect(() => {
        const fetchData = async () => {

            if (typeof params.id === "string") {
                const id = parseInt(params.id)
                if (isNaN(id)) {
                    console.error("Invalid group id")
                    return;
                }

                setGroupId(id);
                setLoading(true);

                try {
                    const [groupDataRes, expenseRes] = await Promise.all([
                        axios.get("http://127.0.0.1:3000/groups/1"),
                        axios.get("http://127.0.0.1:3000/expenses/1")
                    ])

                    setGroupData(groupDataRes.data)
                    setExpenseData(expenseRes.data)
                }
                catch{
                    console.error("Error fetching data")
                    // TODO route to 404
                } finally{
                    setLoading(false)
                }
            }
        }
        fetchData();
    }, []);
    if (!loading) {
        if (groupData === undefined || expenseData === undefined) {
            // TODO 404
            return;
        }
        return (
            <View className="h-full">
                <View className={`bg-secondary`}>
                    <View className="px-8 py-5 flex flex-row items-center justify-between">
                        <BackButton />
                        <TouchableOpacity className="pb-5 pt-2">
                            <Text className="text-xl">Manage</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className={`bg-secondary`}>
                    <Text className="px-8 text-3xl font-bold pb-5">
                        {groupData.name}
                    </Text>
                    <Text className="px-8 my-5 text-xl">
                        Total Expenditure:{" "}
                        <Text className="text-xl font-bold">
                            {groupData.expenditure + " " + groupData.currency}
                        </Text>
                    </Text>
                    <ScrollView
                        id="actionBar"
                        horizontal
                        className="my-5 border-top px-8">
                        <TouchableOpacity
                            className="border px-4 py-2 mr-5 border-black rounded-md"
                            onPress={() =>
                                router.push(`/group/${groupId}/expenses/create`)
                            }>
                            <Text>Add expense</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="border px-4 py-2 mr-5 border-black rounded-md">
                            <Text>Settle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="border px-4 py-2 mr-5 border-black rounded-md">
                            <Text>Manage members</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <Text className="mx-8 mt-5 text-xl font-bold pb-5 border-b border-inactive">
                    Previous expenses
                </Text>
                <ScrollView className="px-8">
                    {expenseData.map((expense, index) => (
                        <ExpenseCard key={index} expense={expense} />
                    ))}
                </ScrollView>
            </View>
        );
    } else {
        // TODO loading screen
    }
}
