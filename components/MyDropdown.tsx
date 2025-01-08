import { MyDropdownProps } from "@/types/componentproptypes";
import colors from "@/colors";
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
                focused == elementIndex
                    ? {
                        // Ignore the typescript error it still works
                          borderColor: `${colors.primary}`
                      }
                    : {
                          borderColor: `${colors.inactive}`
                      }
            ]}
            placeholderStyle={{color: `${colors.inactive}`}}
            onFocus={() => setFocused(elementIndex)}
            onBlur={() => setFocused(null)}
            placeholder={placeholder}
        />
    );
}

export default MyDropdown;
