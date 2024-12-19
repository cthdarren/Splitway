import { Text, View, Pressable } from "react-native";

type GroupCardProps = {
    title: string;
    expenditure: string;
};

function GroupCard({title, expenditure}:GroupCardProps) {
    return (
        <Pressable style={{
            paddingHorizontal:20,
            paddingVertical: 30,
            backgroundColor: "#e6e6e6"
        }}>
            <View className="flex flex-row">
                <Text className="w-1/2 text-xl">{title}</Text>
                <Text className="w-1/2 text-xl text-right">{expenditure}</Text>
            </View>
        </Pressable>
    );
}

export default GroupCard;
