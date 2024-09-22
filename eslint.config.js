import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { plugin } from "typescript-eslint";
// import { rules } from "@eslint/js/src/configs/eslint-all";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: 2021,  // ECMAScript version
      sourceType: 'module'
    },
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      // ...tseslint.configs.recommended,
      // ...eslintPluginPrettier.rules.recommended,        // Spread Prettier recommended rules
      'prettier/prettier': 'error'    // Show Prettier issues as ESLint errors
    },
  },
];
