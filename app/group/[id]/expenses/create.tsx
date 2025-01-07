import BackButton from "@/components/BackButton";
import Checkbox from "react-native-check-box";
import TextInputFocus from "@/components/TextInputFocus";
import strings from "@/i18n/en.json";
import styles from "@/styles/customStyles";
import { Entypo } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ReactElement, useState } from "react";
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
    Pressable
} from "react-native";
import {
    createExpenseData,
    expenseParticipant,
    groupData
} from "@/types/networkresponses";
import { SelectList } from "react-native-dropdown-select-list";
import { category, userModel } from "@/types/models";

const getCategories = (): category[] => {
    // axios request to backend to return list of categories
    return [
        {
            id: 1,
            name: "Food"
        },
        {
            id: 2,
            name: "Transport"
        },
        {
            id: 3,
            name: "Leisure"
        },
        {
            id: 4,
            name: "Misc."
        }
    ];
};
function getGroupData(id: number): groupData {
    if (id === 1) {
        return {
            id: id,
            name: "Japan Trip",
            currency: "JPY",
            expenditure: 500,
            members: [
                {
                    id: 1,
                    name: "Darren"
                },
                {
                    id: 2,
                    name: "Jason"
                },
                { id: 3, name: "Pin Kang" }
            ]
        };
    } else {
        return {
            id: id,
            name: "Japan Trip but ID IS NOT 1",
            currency: "JPY",
            expenditure: 500,
            members: [
                {
                    id: 1,
                    name: "Darren"
                },
                {
                    id: 2,
                    name: "Jason"
                },
                { id: 3, name: "Pin Kang" }
            ]
        };
    }
}

export default function Create() {
    const [category, setCategory] = useState<number | null>(null);
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expensePayerId, setExpensePayerId] = useState<number | null>(null);
    const [splitType, setSplitType] = useState(0);
    const [focused, setFocused] = useState<number | null>(null);
    const [participants, setParticipants] = useState<expenseParticipant[]>([]);

    const submitExpenseData = () => {
        // TODO axios POST request to backend

        if (category !== null && expensePayerId !== null) {
            const data: createExpenseData = {
                categoryId: category,
                expenseName: expenseName,
                totalAmount: expenseAmount,
                payerId: expensePayerId,
                splitType: splitType === 1,
                participants: participants
            };
            console.log(data);
        } else console.log("Fill in category and expense payer");
    };

    const changeSplitType = (splittype: number) => {
        const newParticipantList = [...participants];
        newParticipantList.map(
            (participants) => (participants.expenseAmount = null)
        );
        setSplitType(splittype);
    };

    const getParticipantSplit = (id: number): string => {
        const expenseAmt = participants.find(
            (part) => part.id === id
        )?.expenseAmount;
        if (expenseAmt === undefined || expenseAmt === null) return "";
        return expenseAmt.toString();
    };

    const editParticipantSplit = (id: number, newAmount: string) => {
        const newParticipantList = [...participants];
        const participantIndex = participants.findIndex(
            (existingParticipant) => existingParticipant.id == id
        );
        if (participantIndex !== -1) {
            newParticipantList[participantIndex].expenseAmount =
                parseInt(newAmount) || null;
            setParticipants(newParticipantList);
        }
    };

    const toggleCheckParticipant = (newParticipant: userModel) => {
        const newParticipantList = [...participants];
        if (participantIsChecked(newParticipant)) {
            newParticipantList.splice(
                newParticipantList.findIndex(
                    (existingParticipant) =>
                        existingParticipant.id == newParticipant.id
                ),
                1
            );
        } else {
            const newExpenseParticipant: expenseParticipant = {
                id: newParticipant.id,
                expenseAmount: null
            };
            newParticipantList.push(newExpenseParticipant);
        }
        setParticipants(newParticipantList);
    };

    const participantIsChecked = (newParticipant: userModel) => {
        return (
            participants.findIndex(
                (existingParticipant) =>
                    existingParticipant.id == newParticipant.id
            ) !== -1
        );
    };

    const params = useLocalSearchParams();
    if (typeof params.id === "string") {
        const groupId: number = parseInt(params.id);
        const data: groupData = getGroupData(groupId);
        const categoryData: category[] = getCategories();

        // format categoryData for dropdown
        const categorySelectData = categoryData.map((category) => ({
            key: category.id,
            value: category.name
        }));

        return (
            <View className="flex py-5 h-full">
                <View className="flex flex-row px-8 justify-between">
                    <BackButton />
                    <TouchableOpacity
                        onPress={() => submitExpenseData()}
                        className="pl-2 pt-2 pb-5 ">
                        <Text className="text-xl">
                            {strings.CREATE_GROUP_SAVE_BUTTON}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className="px-8">
                    <Text className="text-4xl mt-3">
                        {strings.CREATE_EXPENSE_HEADER + data.name}
                    </Text>
                    <View className="flex flex-col py-5">
                        <Text className="text-lg mt-5">
                            {strings.CREATE_EXPENSE_CATEGORY}
                        </Text>
                        <SelectList
                            setSelected={(value: number) => setCategory(value)}
                            data={categorySelectData}
                            save="key"></SelectList>

                        <Text className="text-lg mt-10">
                            {strings.CREATE_EXPENSE_NAME}
                        </Text>
                        <TextInputFocus
                            focused={focused}
                            elementIndex={1}
                            setFocused={setFocused}
                            onChangeFunc={setExpenseName}
                            value={expenseName}
                            placeholder={strings.CREATE_EXPENSE_NAME}
                        />

                        <Text className="text-lg mt-10">
                            {strings.CREATE_EXPENSE_AMOUNT}
                        </Text>
                        <TextInputFocus
                            focused={focused}
                            elementIndex={2}
                            setFocused={setFocused}
                            onChangeFunc={setExpenseAmount}
                            value={expenseAmount}
                            placeholder={strings.CREATE_EXPENSE_AMOUNT}
                        />
                        <Text className="text-lg mt-10">
                            {strings.CREATE_EXPENSE_PAYER}
                        </Text>
                        {
                            // DROPDOWN as well
                        }
                        <TextInputFocus
                            focused={focused}
                            elementIndex={3}
                            setFocused={setFocused}
                            onChangeFunc={setExpensePayerId}
                            value={expensePayerId}
                            placeholder={strings.CREATE_EXPENSE_PAYER}
                        />
                        {
                            // ===============
                        }
                        <Text className="text-lg mt-10">
                            {strings.CREATE_EXPENSE_SPLIT}
                        </Text>
                        <View className="flex flex-row justify-between w-full">
                            <TouchableOpacity
                                className={`border-[${splitType === 0 ? styles.primary : styles.inactive}] border rounded-md py-5 mr-10 flex-grow`}
                                onPress={() => {
                                    changeSplitType(0);
                                }}>
                                <Text className="w-full text-center">
                                    {strings.CREATE_EXPENSE_SPLIT_EVEN}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`border-[${splitType === 1 ? styles.primary : styles.inactive}] border rounded-md py-5 flex-grow`}
                                onPress={() => {
                                    changeSplitType(1);
                                }}>
                                <Text className="w-full text-center">
                                    {strings.CREATE_EXPENSE_SPLIT_UNEVEN}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {data.members.map((member, index) => {
                            return (
                                <View
                                    className="flex mt-2 flex-row items-center"
                                    key={member.id}>
                                    <Checkbox
                                        style={{ paddingVertical: 6 }}
                                        onClick={() => {
                                            toggleCheckParticipant(member);
                                        }}
                                        isChecked={participantIsChecked(member)}
                                    />
                                    <View className="flex flex-row justify-between items-center flex-grow">
                                        <Pressable
                                            className="py-3"
                                            onPress={() => {
                                                toggleCheckParticipant(member);
                                            }}>
                                            <Text
                                                style={{
                                                    borderColor: "transparent",
                                                    borderStyle: "solid",
                                                    borderWidth: 1
                                                }}
                                                className="text-lg pl-5">
                                                {member.name}
                                            </Text>
                                        </Pressable>
                                        {splitType === 1 ? (
                                            participantIsChecked(member) ? (
                                                <TextInput
                                                    keyboardType="numeric"
                                                    value={getParticipantSplit(
                                                        member.id
                                                    )}
                                                    onChangeText={(value) => {
                                                        editParticipantSplit(
                                                            member.id,
                                                            value
                                                        );
                                                    }}
                                                    placeholder={
                                                        strings.CREATE_EXPENSE_SPLIT_UNEVEN_INDIV_AMOUNT
                                                    }
                                                    className={`border-b rounded-lg px-3 color-black w-32`}
                                                />
                                            ) : (
                                                <React.Fragment></React.Fragment>
                                            )
                                        ) : (
                                            <TextInput
                                                editable={false}
                                                className="border-0 color-transparent"
                                            />
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    } else {
        // TODO route to 404 page
    }
}
