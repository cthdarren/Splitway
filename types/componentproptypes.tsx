export type GroupCardProps = {
    id: number;
    title: string;
    expenditure: number;
    currency: string;
};

export type TextInputFocusProps= {
    focused: number | null; 
    elementIndex: number; 
    setFocused: React.Dispatch<React.SetStateAction<number | null>>; 
    onChangeFunc: React.Dispatch<React.SetStateAction<any>>; 
    value :any; 
    placeholder: string 
};
