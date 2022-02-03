import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from "react-native-paper";
import { Feather } from "@expo/vector-icons";

const fontConfig = {
  web: {
    regular: {
      fontFamily: "Inter-Black",
      fontWeight: "400" as "400",
    },
    medium: {
      fontFamily: "Inter-Black",
      fontWeight: "500" as "500",
    },
    light: {
      fontFamily: "Inter-Black",
      fontWeight: "300" as "300",
    },
    thin: {
      fontFamily: "Inter-Black",
      fontWeight: "100" as "100",
    },
  },
  ios: {
    regular: {
      fontFamily: "Inter-Black",
      fontWeight: "400" as "400",
    },
    medium: {
      fontFamily: "Inter-Black",
      fontWeight: "500" as "500",
    },
    light: {
      fontFamily: "Inter-Black",
      fontWeight: "300" as "300",
    },
    thin: {
      fontFamily: "Inter-Black",
      fontWeight: "100" as "100",
    },
  },
  default: {
    regular: {
      fontFamily: "Inter-Black",
      fontWeight: "normal" as "normal",
    },
    medium: {
      fontFamily: "Inter-Black",
      fontWeight: "normal" as "normal",
    },
    light: {
      fontFamily: "Inter-Black",
      fontWeight: "normal" as "normal",
    },
    thin: {
      fontFamily: "Inter-Black",
      fontWeight: "normal" as "normal",
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#212121",
  },
  fonts: configureFonts(fontConfig),
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider
        settings={{
          icon: (props) => <Feather {...props} />,
        }}
        theme={theme}
      >
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
