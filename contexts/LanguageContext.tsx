import { useContext, createContext, ReactNode, useState } from "react";

type languageContextType = {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

const LanguageContext = createContext<languageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState("english");

    return (
        <LanguageContext.Provider value={{ language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};
export const useLanguageContext = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error(
            "useCurrencyContext must be used within a CurrencyProvider",
        );
    }
    return context;
};
