import styles from "@/styles/customStyles";
import { TextInputFocusProps } from "@/types/componentproptypes";
import { TextInput } from "react-native";

function TextInputFocus({
  focused,
  elementIndex,
  setFocused,
  onChangeFunc,
  value,
  placeholder,
}: TextInputFocusProps) {
  return (
    <TextInput
      className={
        `${focused === elementIndex ? `border-${styles.primary}` : `border-${styles.inactive}`}` +
        " border rounded-md px-3 py-5 mt-3"
      }
      onFocus={() => setFocused(elementIndex)}
      onEndEditing={() => setFocused(null)}
      onChangeText={onChangeFunc}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default TextInputFocus;
