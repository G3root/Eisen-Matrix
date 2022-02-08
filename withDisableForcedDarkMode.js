"use strict";
exports.__esModule = true;
var config_plugins_1 = require("@expo/config-plugins");
var withDisableForcedDarkMode = function (expoConfig) {
    return config_plugins_1.withAndroidStyles(expoConfig, function (modConfig) {
        modConfig.modResults = config_plugins_1.AndroidConfig.Strings.setStringItem([
            {
                _: "false",
                $: {
                    name: "android:forceDarkAllowed"
                }
            },
        ], modConfig.modResults);
        return modConfig;
    });
};
exports["default"] = withDisableForcedDarkMode;
