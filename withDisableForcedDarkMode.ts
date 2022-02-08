import type { ConfigPlugin } from "@expo/config-plugins";
import { AndroidConfig, withAndroidStyles } from "@expo/config-plugins";

const withDisableForcedDarkMode: ConfigPlugin = (expoConfig) =>
  withAndroidStyles(expoConfig, (modConfig) => {
    modConfig.modResults = AndroidConfig.Strings.setStringItem(
      [
        {
          _: "false",
          $: {
            name: "android:forceDarkAllowed",
          },
        },
      ],
      modConfig.modResults
    );
    return modConfig;
  });

export default withDisableForcedDarkMode;
