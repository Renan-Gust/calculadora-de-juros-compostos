import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  {
    "ignores": ["tailwind.config.js", "src/components/ui/**", "src/lib/utils.ts", "eslint.config.js"],
    rules: {
      "no-unused-vars": "error",
      "semi": "error",
      "quotes": ["error", "single"],
      "indent": ["error", 4],
    },
    languageOptions: {
      globals: globals.browser,
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];