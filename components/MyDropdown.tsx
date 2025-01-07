import styles from "@/styles/customStyles";
import { MyDropdownProps } from "@/types/componentproptypes";
import { Dropdown } from "react-native-element-dropdown";

function MyDropdown({
    focused,
    elementIndex,
    data,
    setFocused,
    onChangeFunc,
    value,
    placeholder
}: MyDropdownProps) {
    return (
        <Dropdown
            labelField={"label"}
            valueField={"value"}
            onChange={(item) => {
                onChangeFunc(item.value);
                setFocused(null);
            }}
            data={data}
            value={value}
            style={[
                {
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingVertical: 16,
                    paddingHorizontal: 10
                },
                focused == 0
                    ? {
                          borderColor: `${styles.primary}`
                      }
                    : {
                          borderColor: `${styles.inactive}`
                      }
            ]}
            placeholderStyle={{color: `${styles.inactive}`}}
            onFocus={() => setFocused(elementIndex)}
            onBlur={() => setFocused(null)}
            placeholder={placeholder}
        />
    );
}

export default MyDropdown;
