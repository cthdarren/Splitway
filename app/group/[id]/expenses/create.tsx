import BackButton from "@/components/BackButton";
import TextInputFocus from "@/components/TextInputFocus";
import strings from "@/i18n/en.json";
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
} from "react-native";

function getGroupData(id: number) {
  if (id === 1) {
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
  } else {
    return {
      name: "Japan Trip but ID IS NOT 1",
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
}

export default function Create() {
  const [groupname, setGroupname] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expensePayer, setExpensePayer] = useState("");
  const [focused, setFocused] = useState<number | null>(null);
  const params = useLocalSearchParams();
  if (typeof params.id === "string") {
    const groupId = parseInt(params.id);
    const data = getGroupData(groupId);
    return (
      <View className="flex py-5 h-full">
        <View className="flex flex-row px-8 justify-between">
          <BackButton />
          <TouchableOpacity className="pl-2 pt-2 pb-5 ">
            <Text className="text-xl">{strings.CREATE_GROUP_SAVE_BUTTON}</Text>
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
            {
              // REPLACE WITH DROP DOWN
            }
            <TextInput
              className={
                `${focused === 0 ? "border-[#000]" : "border-[#aaa]"}` +
                " border rounded-md px-3 py-5 mt-3"
              }
              onFocus={() => setFocused(0)}
              onEndEditing={() => setFocused(null)}
              onChangeText={setGroupname}
              value={groupname}
              placeholder={strings.CREATE_GROUP_GROUP_NAME_LABEL}
            />
            {
              // =====================
            }

            <Text className="text-lg mt-10">{strings.CREATE_EXPENSE_NAME}</Text>
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
              onChangeFunc={setExpenseName}
              value={expenseName}
              placeholder={strings.CREATE_EXPENSE_AMOUNT}
            />
            <Text className="text-lg mt-10">
              {strings.CREATE_EXPENSE_PAYER}
            </Text>
            <TextInputFocus
              focused={focused}
              elementIndex={3}
              setFocused={setFocused}
              onChangeFunc={setExpenseName}
              value={expenseName}
              placeholder={strings.CREATE_EXPENSE_PAYER}
            />
            <Text className="text-lg mt-10">
              {strings.CREATE_EXPENSE_SPLIT}
            </Text>
            <View className="flex flex-row justify-between w-full">
                            <TouchableOpacity className="border-black border rounded-md mr-10 py-5 flex-grow">
                                <Text className="w-full text-center">
                                    {strings.CREATE_EXPENSE_SPLIT_EVEN}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="border-black border rounded-md py-5 flex-grow">
                                <Text className="w-full text-center">
                                    {strings.CREATE_EXPENSE_SPLIT_UNEVEN}
                                </Text>
                            </TouchableOpacity>
                        </View>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    // TODO route to 404 page
  }
}
