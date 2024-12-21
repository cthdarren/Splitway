import { Stack } from "expo-router";
import strings from "@/i18n/en.json"
import "../global.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider, useThemeContext } from "@/contexts/ThemeContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

export default function RootLayout() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <CurrencyProvider>
                    <App />
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
                statusBarStyle: theme === strings.LIGHT_THEME_NAME ? "light" : "dark",
            }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
