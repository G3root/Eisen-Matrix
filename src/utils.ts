import { customAlphabet } from "nanoid/non-secure";
import "react-native-get-random-values";
export const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  10
);
