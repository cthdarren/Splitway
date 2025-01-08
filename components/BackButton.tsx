import { TouchableOpacity } from "react-native";
import { Ionicons} from "@expo/vector-icons/";
import { router } from "expo-router";
import colors from "@/colors";

function BackButton() {
    return (
        <TouchableOpacity
          className="pr-10 pt-2 pb-5"
          onPress={() => router.back()}>
          <Ionicons
            size={20}
            className="flex items-center"
            name="arrow-back"
            color={colors.primary}
          />
        </TouchableOpacity>
    );
}

export default BackButton;
