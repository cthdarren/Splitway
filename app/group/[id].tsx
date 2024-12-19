import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
export default function Group(){
  const params = useLocalSearchParams();
  return(
    <Text>Group {params.id}</Text>
  )
}
