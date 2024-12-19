import { Stack } from "expo-router";
import { createContext, useContext, useState } from "react";

export default function RootLayout() {
  const ThemeContext = createContext('dark');
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarStyle: theme == 'dark' ? ('dark'):('light'),
        }}
      />
      ;
    </ThemeContext.Provider>
  );
}
