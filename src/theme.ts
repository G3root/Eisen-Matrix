import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
  Colors,
} from "react-native-paper";

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

export const DefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    accent: "black",
  },
  fonts: configureFonts(fontConfig),
};

export const DarkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    background: "#1c1c1f",
    surface: "#1c1c1f",
    accent: "#0954a5",
  },
  fonts: configureFonts(fontConfig),
};
