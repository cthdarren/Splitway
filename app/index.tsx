import GroupCard from "@/components/GroupCard";
import { Text, View, Button, Alert, ScrollView } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 30,
                paddingVertical: 20,
            }}
        >
            <Text className="text-3xl">SplitWay</Text>
            <Text className="font-bold text-2xl mt-10">Groups</Text>
            <ScrollView className="py-5">
                <GroupCard title={"Japap"} expenditure={"500"}/>

            </ScrollView>
            <Button onPress={()=> {Alert.alert("HEHEHEHEH")}} title="Helli"/>
        </View>
    );
}
