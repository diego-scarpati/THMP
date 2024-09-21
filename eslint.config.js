import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { plugin } from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {extends: ["eslint:recommended", "plugin:prettier/recommended"]},
  {plugins: ["prettier"]},
  {rules: {"prettier/prettier": "error"}},
];