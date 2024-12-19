import { Stack } from "expo-router";
import "../global.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider, useThemeContext } from "@/contexts/ThemeContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

export default function RootLayout() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <CurrencyProvider>
                    <App/>
                </CurrencyProvider>
            </ThemeProvider>
        </LanguageProvider>
    );
}

function App() {
    const { theme } = useThemeContext();
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                statusBarStyle: theme == "dark" ? "dark" : "light",
            }}
        />
    );
}
