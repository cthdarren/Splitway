import strings from "@/i18n/en.json";
import { Entypo } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { ReactElement, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from "react-native";

export default function Create() {
  const [groupname, setGroupname] = useState("");
  const [currency, setCurrency] = useState("");
  const [participants, setParticipants] = useState([""]);
  const [focused, setFocused] = useState<number | null>(null);

  function edit_participant_array(index: number, value: string) {
    const tmp_participant_list = [...participants];
    tmp_participant_list[index] = value;
    if (
      tmp_participant_list.length > 0 &&
      tmp_participant_list[tmp_participant_list.length - 1] !== ""
    ) {
      tmp_participant_list.push("");
    }
    setParticipants(tmp_participant_list);
  }

  function deleteParticipant(index: number) {
    const tmp_participant_list = [...participants];
    tmp_participant_list.splice(index, 1);
    setParticipants(tmp_participant_list);
  }
  return (
    <View className="flex py-5 h-full">
      <View className="flex flex-row px-8 justify-between">
        <Pressable className="pr-10 pt-2 pb-5" onPress={() => router.back()}>
          <FontAwesome
            size={20}
            className="flex items-center"
            name="arrow-back"
            color={"#000"}
          />
        </Pressable>
        <Text className="pt-2 pb-5 text-xl">
          {strings.CREATE_GROUP_SAVE_BUTTON}
        </Text>
      </View>
      <ScrollView className="px-8">
        <Text className="text-4xl mt-3">{strings.CREATE_GROUP_HEADER}</Text>
        <View className="flex flex-col py-5">
          <Text className="text-lg mt-5">
            {strings.CREATE_GROUP_GROUP_NAME_LABEL}
          </Text>
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

          <Text className="text-lg mt-10">
            {strings.CREATE_GROUP_CURRENCY_LABEL}
          </Text>

          <Text className="text-lg mt-10">
            {strings.CREATE_GROUP_PARTICIPANTS_LABEL}
          </Text>
          {participants.map((item, index) => {
            return (
              <View
                key={index + 1}
                className={
                  `${focused === index + 1 ? "border-[#000]" : "border-[#aaa]"}` +
                  " flex flex-row justify-between border rounded-md mt-3"
                }>
                <TextInput
                  className="px-3 py-5 flex-grow"
                  onFocus={() => setFocused(index + 1)}
                  onEndEditing={() => setFocused(null)}
                  onChangeText={(value) => edit_participant_array(index, value)}
                  value={participants[index]}
                  placeholder={
                    strings.CREATE_GROUP_ADD_PARTICIPANTS + " " + (index + 1)
                  }
                />
                {participants.length > 1 ? (
                  <Pressable
                    className="flex flex-col pr-3 justify-center"
                    onPress={() => deleteParticipant(index)}>
                    <Entypo
                      name="cross"
                      size={20}
                      color={`${focused === index + 1 ? "#000" : "#aaa"}`}
                    />
                  </Pressable>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
