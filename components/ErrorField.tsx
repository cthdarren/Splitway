import { Text } from "react-native";
import styles from "@/styles/customStyles";
import { MyErrors } from "@/types/errors/myerrors";
import { ErrorFieldProps } from "@/types/componentproptypes";

function ErrorField({errors, inputIndex} : ErrorFieldProps){
    return (
        <Text
            className={
                errors.findIndex((err) => err.inputIndex === inputIndex) !== -1
                    ? ""
                    : "hidden h-0 w-0 p-0 m-0 " + ` text-[${styles.danger}]`
                    // TODO FIX THE RED COLOR
            }>
            {errors.find((err) => err.inputIndex === inputIndex)?.error}
        </Text>
    );
}

export default ErrorField;
