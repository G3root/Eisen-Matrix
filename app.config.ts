// WARNING THIS ISN'T VERSIONED
import { ExpoConfig, ConfigContext } from "@expo/config";

export const APP_NAME = "Eisen Matrix";
export const VERSION = "1.2.0";
export const VERSION_CODE = 3;
export const LICENSE = "MIT";
export const PACKAGE_NAME = "com.g3root.EisenMatrix";
export const REPO_Link = "https://github.com/G3root/Eisen-Matrix";
export const LOGO_SOURCE = "https://rareblocks.xyz/logos-by-larkef";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: "eisen-matrix",
  version: VERSION,
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: PACKAGE_NAME,
    buildNumber: VERSION,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: PACKAGE_NAME,
    versionCode: VERSION_CODE,
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
});
