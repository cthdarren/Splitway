import { KeyboardTypeOptions } from "react-native";
import { MyErrors } from "./errors/myerrors";

export type GroupCardProps = {
    id: number;
    title: string;
    expenditure: number;
    currency: string;
};

export type TextInputFocusProps = {
    focused: number | null;
    elementIndex: number;
    setFocused: React.Dispatch<React.SetStateAction<number | null>>;
    onChangeFunc: React.Dispatch<React.SetStateAction<any>>;
    value: any;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
};

export type MyDropdownProps = {
    focused: number | null;
    elementIndex: number;
    data: any[];
    setFocused: React.Dispatch<React.SetStateAction<number | null>>;
    onChangeFunc: React.Dispatch<React.SetStateAction<any>>;
    value: any;
    placeholder: string | undefined;
};

export type ErrorFieldProps = {
    errors: MyErrors[];
    inputIndex: number;
};
