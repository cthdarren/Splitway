import { createContext, useContext, ReactNode, useState } from "react";

type currencyContextType = {
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
};

const CurrencyContext = createContext<currencyContextType | null>(null);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState("SGD");

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrencyContext = () => {
  return useContext(CurrencyContext);
};
