import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

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
      >
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
