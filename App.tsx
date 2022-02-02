import { StatusBar } from "expo-status-bar";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}
