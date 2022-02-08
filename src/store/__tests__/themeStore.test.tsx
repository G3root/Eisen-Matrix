import { render, fireEvent } from "@testing-library/react-native";
import shallow from "zustand/shallow";
import { View, Text, Button } from "react-native";
import { useTheme } from "..";

it("should change the theme", async () => {
  const { getByText } = render(<ThemeComponent />);

  getByText("theme: light");
  fireEvent.press(getByText("toggle theme"));
  getByText("theme: dark");
  fireEvent.press(getByText("toggle theme"));
  getByText("theme: light");
});

function ThemeComponent() {
  const { toggleTheme, theme } = useTheme(
    (state) => ({ theme: state.isDark, toggleTheme: state.toggleTheme }),
    shallow
  );

  return (
    <View>
      <Text>theme: {theme ? "dark" : "light"}</Text>
      <Button title="toggle theme" onPress={() => toggleTheme()} />
    </View>
  );
}
