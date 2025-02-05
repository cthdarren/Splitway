import BackButton from "@/components/BackButton";
import Checkbox from "react-native-check-box";
import TextInputFocus from "@/components/TextInputFocus";
import { Dropdown } from "react-native-element-dropdown";
import strings from "@/i18n/en.json";
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
    CreateExpenseData,
    ExpenseParticipant,
    GroupData
} from "@/types/networkresponses";
import { category, userModel } from "@/types/models";
import MyDropdown from "@/components/MyDropdown";
import { MyErrors } from "@/types/errors/myerrors";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import ErrorField from "@/components/ErrorField";
import { parse } from "@babel/core";

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
function getGroupData(id: number): GroupData {
    // axios request to GET group data.
    // in groupId, out group data json
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
    const [category, setCategory] = useState<string | null>(null);
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState<string>("");
    const [expensePayerId, setExpensePayerId] = useState<string | null>(null);
    const [splitType, setSplitType] = useState(0);
    const [focused, setFocused] = useState<number | null>(null);
    const [participants, setParticipants] = useState<ExpenseParticipant[]>([]);
    const [errors, setErrors] = useState<MyErrors[]>([]);
    const categoryData: category[] = getCategories();

    const changeExpenseAmount = (newAmount: string) => {
        console.log(newAmount);
        const validChars = "0123456789.";
        const newAmountSplit = newAmount.split(".");
        const beforeDec = newAmountSplit[0];

        if ([...newAmount].every((char) => validChars.includes(char))) {
            if (newAmountSplit.length > 1) {
                const afterDec = newAmountSplit[1];
                if (afterDec.length > 2) {
                    setExpenseAmount(beforeDec + "." + afterDec.slice(0, 2));
                } else {
                    setExpenseAmount(newAmount);
                }
            } else {
                setExpenseAmount(newAmount);
            }
        }
    };

    //==================================================
    //  SPLIT RELATED FUNCTIONS
    //
    //  Many of these functions are here due to how i
    //  chose to store the values of the participants
    //  especially when performing an uneven split.
    //  I wanted to keep just one state variable for
    //  both even and uneven splits
    //==================================================

    // used to reset the values of the inputs when changing between uneven and even split
    const changeSplitType = (splittype: number) => {
        const newParticipantList = [...participants];
        newParticipantList.map(
            (participants) => (participants.expenseAmount = null)
        );
        setSplitType(splittype);
    };

    // to obtain the amount to pay by each participant, tied to the participants state array
    // basically just getting the value, but i had to do some manipulationg because of how i'm
    // storing the data in state and making sure that it doesn't crash
    const getParticipantSplit = (id: number): string => {
        const expenseAmt = participants.find(
            (part) => part.id === id
        )?.expenseAmount;
        if (expenseAmt === undefined || expenseAmt === null) return "";
        return expenseAmt.toString();
    };

    // to edit the amount to pay by each participant, tied to the participants state array
    // basically just the onChange, but i had to do some manipulationg because of how i'm
    // storing the data in state
    const editParticipantSplit = (id: number, newAmount: string) => {
        const validChars = "0123456789.";
        const newParticipantList = [...participants];
        const participantIndex = participants.findIndex(
            (existingParticipant) => existingParticipant.id == id
        );
        if (participantIndex !== -1) {
            // check if every character in newAmount is part of validChars
            if (
                [...newAmount].every((char) => validChars.includes(char)) ===
                true
            ) {
                newParticipantList[participantIndex].expenseAmount =
                    newAmount || null;
                setParticipants(newParticipantList);
            }
        }
    };

    // Check or uncheck specified participant
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
            const newExpenseParticipant: ExpenseParticipant = {
                id: newParticipant.id,
                expenseAmount: null
            };
            newParticipantList.push(newExpenseParticipant);
        }
        setParticipants(newParticipantList);
    };

    // Check if participant has been marked as included in the bill
    const participantIsChecked = (newParticipant: userModel) => {
        return (
            participants.findIndex(
                (existingParticipant) =>
                    existingParticipant.id == newParticipant.id
            ) !== -1
        );
    };

    const calculateRemainingAmount = (): number => {
        // this complicated mess sums up all the expenses of each participant in the split
        // and returns you the remaining amount

        // sum up all the expenses for each participant
        const totalSum: number = participants.reduce(
            (partialSum: number, a: ExpenseParticipant) =>
                partialSum + parseFloat(a.expenseAmount || "0"),
            0
        );
        const remainingSum: number = parseFloat(expenseAmount || '0') - totalSum;
        return parseFloat(remainingSum.toFixed(2));
    };

    //==================================================
    // SPLIT RELATED FUCNTIONS END
    //==================================================

    const params = useLocalSearchParams();
    if (typeof params.id === "string") {
        const groupId: number = parseInt(params.id);
        const data: GroupData = getGroupData(groupId);

        const validateFields = () => {
            const validChars = "0123456789.";
            setErrors([]);
            const newErrors: MyErrors[] = [];
            if (
                category == null ||
                categoryData.find((cat) => cat.id === parseInt(category)) ===
                    undefined
            ) {
                newErrors.push({ inputIndex: 0, error: "Invalid category!" });
            }
            if (expenseName === "") {
                newErrors.push({
                    inputIndex: 1,
                    error: "Invalid expense name!"
                });
            }
            const tmpAmt = parseFloat(expenseAmount);
            if (isNaN(tmpAmt) || tmpAmt <= 0 || expenseAmount == null) {
                newErrors.push({
                    inputIndex: 2,
                    error: "Invalid expense amount!"
                });
            }
            if (
                expensePayerId === null ||
                data.members.find(
                    (member) => member.id === parseInt(expensePayerId)
                ) === undefined
            ) {
                newErrors.push({ inputIndex: 3, error: "Invalid payer!" });
            }
            // if there are no participants OR if it's an uneven split and one of the participants has an empty/non positive value
            // OR expenseAmount contains invalid chars
            if (
                participants.length === 0 ||
                (splitType === 1 &&
                    participants.filter(
                        (part) =>
                            part.expenseAmount == null ||
                            parseFloat(part.expenseAmount) <= 0 ||
                            [...part.expenseAmount].every((char) =>
                                validChars.includes(char)
                            ) === false
                    ).length > 0)
            ) {
                newErrors.push({ inputIndex: 4, error: "Invalid split!" });
            } else if (
                // this typescript error won't reach because i check if it's null in the prev condition
                // checks to see if the split amount matches the total expense amount
                splitType === 1 &&
                participants.reduce(
                    (partialSum: number, a: ExpenseParticipant) =>
                        partialSum + parseFloat(a.expenseAmount || "0"),
                    0
                ) !== parseFloat(expenseAmount)
            ) {
                newErrors.push({
                    inputIndex: 4,
                    error: "Total of split does not match total expense!"
                });
            }
            setErrors(newErrors);
            if (newErrors.length > 0) return false;
            return true;
        };

        const submitExpenseData = () => {
            // TODO axios POST request to backend
            if (!validateFields()) {
                return;
            }
            if (category !== null && expensePayerId !== null) {
                const data: CreateExpenseData = {
                    groupId: groupId,
                    // parse back into int because of react dropdown wants keys in a string form
                    categoryId: parseInt(category),
                    expenseName: expenseName,
                    totalAmount: parseFloat(expenseAmount),
                    // parse back into int because of react dropdown wants keys in a string form
                    payerId: parseInt(expensePayerId),
                    splitType: splitType === 1,
                    participants: participants
                };
                // SEND REQUEST
                console.log(data);
            }
        };

        // format categoryData for dropdown
        const categorySelectData = categoryData.map((category) => ({
            // react dropdown for some reason wants value to be a string so, so be it
            value: category.id.toString(),
            label: category.name
        }));

        // format member data for dropdown
        const memberData = data.members.map((member) => ({
            // react dropdown for some reason wants value to be a string so, so be it
            value: member.id.toString(),
            label: member.name
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
                        <Text className="text-lg mt-5 mb-3">
                            {strings.CREATE_EXPENSE_CATEGORY}
                        </Text>
                        <MyDropdown
                            focused={focused}
                            elementIndex={0}
                            data={categorySelectData}
                            setFocused={setFocused}
                            onChangeFunc={setCategory}
                            value={category}
                            placeholder={undefined}
                        />
                        <ErrorField errors={errors} inputIndex={0} />
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
                        <ErrorField errors={errors} inputIndex={1} />
                        <Text className="text-lg mt-10">
                            {strings.CREATE_EXPENSE_AMOUNT}
                        </Text>
                        <TextInputFocus
                            keyboardType="numeric"
                            focused={focused}
                            elementIndex={2}
                            setFocused={setFocused}
                            onChangeFunc={changeExpenseAmount}
                            value={expenseAmount}
                            placeholder={strings.CREATE_EXPENSE_AMOUNT}
                        />
                        <ErrorField errors={errors} inputIndex={2} />
                        <Text className="text-lg mt-10 mb-3">
                            {strings.CREATE_EXPENSE_PAYER}
                        </Text>
                        <MyDropdown
                            focused={focused}
                            elementIndex={3}
                            data={memberData}
                            setFocused={setFocused}
                            onChangeFunc={setExpensePayerId}
                            value={expensePayerId}
                            placeholder={strings.CREATE_EXPENSE_PAYER}
                        />
                        <ErrorField errors={errors} inputIndex={3} />
                        <Text className="text-lg mt-10">
                            {strings.CREATE_EXPENSE_SPLIT}
                        </Text>

                        <ErrorField errors={errors} inputIndex={4} />
                        <View className="flex flex-row justify-between w-full mt-3">
                            <TouchableOpacity
                                className={`${splitType === 0 ? "border-primary" : "border-inactive"} border rounded-md py-5 mr-10 flex-grow`}
                                onPress={() => {
                                    changeSplitType(0);
                                }}>
                                <Text className="w-full text-center">
                                    {strings.CREATE_EXPENSE_SPLIT_EVEN}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={`${splitType === 1 ? "border-primary" : "border-inactive"} border rounded-md py-5 flex-grow`}
                                onPress={() => {
                                    changeSplitType(1);
                                }}>
                                <Text className="w-full text-center">
                                    {strings.CREATE_EXPENSE_SPLIT_UNEVEN}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text
                            className={`${splitType === 1 ? "text-lg pt-3 text-right " : "hidden"} ${calculateRemainingAmount() < 0 ? "text-danger" : ""}`}>
                            {strings.CREATE_EXPENSE_SPLIT_UNEVEN_AMOUNT_LEFT +
                                calculateRemainingAmount()}
                        </Text>

                        {data.members.map((member) => {
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
                                                    keyboardType="decimal-pad"
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
                                                    className={`border-b px-3 color-black w-32 text-right`}
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
