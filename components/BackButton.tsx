import { TouchableOpacity } from "react-native";
import { Ionicons} from "@expo/vector-icons/";
import { router } from "expo-router";

function BackButton() {
    return (
        <TouchableOpacity
          className="pr-10 pt-2 pb-5"
          onPress={() => router.back()}>
          <Ionicons
            size={20}
            className="flex items-center"
            name="arrow-back"
            color={"#000"}
          />
        </TouchableOpacity>
    );
}

export default BackButton;
