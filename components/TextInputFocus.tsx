import { TextInputFocusProps } from "@/types/componentproptypes";
import { TextInput } from "react-native";

function TextInputFocus({
    focused,
    elementIndex,
    setFocused,
    onChangeFunc,
    value,
    placeholder,
    keyboardType
}: TextInputFocusProps) {
    return (
        <TextInput
            keyboardType={keyboardType ? keyboardType : undefined}
            className={
                `${focused === elementIndex ? `border-primary` : `border-inactive`}` +
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
