import { themeContextType } from "@/types/contexttypes"
import { createContext, useContext, ReactNode, useState } from "react";

const ThemeContext = createContext<themeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState("dark");

    return (
        <ThemeContext.Provider value={{ theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
export const useThemeContext= () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(
            "useCurrencyContext must be used within a CurrencyProvider",
        );
    }
    return context;
};
