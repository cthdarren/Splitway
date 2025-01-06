import { TouchableOpacity } from "react-native";
import { Ionicons} from "@expo/vector-icons/";
import { router } from "expo-router";
import styles from "@/styles/customStyles";

function BackButton() {
    return (
        <TouchableOpacity
          className="pr-10 pt-2 pb-5"
          onPress={() => router.back()}>
          <Ionicons
            size={20}
            className="flex items-center"
            name="arrow-back"
            color={styles.primary}
          />
        </TouchableOpacity>
    );
}

export default BackButton;
