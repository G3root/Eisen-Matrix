import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

import { ThemeProvider } from "@emotion/react";

import { Provider as PaperProvider } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "./src/store";
import { IsDark } from "./src/selectors";
import { DarkTheme, DefaultTheme } from "./src/theme";

export default function App() {
  const isLoadingComplete = useCachedResources();

  const isThemeDark = useTheme(IsDark);

  let theme = isThemeDark ? DarkTheme : DefaultTheme;
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider
        settings={{
          icon: (props: any) => <Feather {...props} />,
        }}
        theme={theme}
      >
        <ThemeProvider theme={{ colors: theme.colors }}>
          <SafeAreaProvider>
            <Navigation isDark={isThemeDark} />

            <StatusBar style={isThemeDark ? "light" : "dark"} />
          </SafeAreaProvider>
        </ThemeProvider>
      </PaperProvider>
    );
  }
}
