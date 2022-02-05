import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from "react-native-paper";

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
        <SafeAreaProvider>
          <Navigation isDark={isThemeDark} />

          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
