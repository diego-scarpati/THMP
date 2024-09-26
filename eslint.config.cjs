// eslint.config.js
// const eslintRecommended = require('eslint/use-at-your-own-risk').builtinRules;
const prettierConfig = require("eslint-plugin-prettier").configs.recommended;

module.exports = [
  {
    files: ["**/*.{js, cjs}"], // Lint all JavaScript files
    languageOptions: {
      ecmaVersion: 2021, // Support for modern ECMAScript features
      sourceType: "module", // Enable ES module support (import/export)
      globals: {
        // Define global variables for Node.js environment
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        process: "readonly",
      },
    },

    // Use Prettier as a plugin
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },

    // Apply recommended rules and Prettier configuration
    rules: {
      ...prettierConfig.rules, // Integrate Prettier recommended rules
      "prettier/prettier": "error", // Prettier errors will be shown as ESLint errors

      // Additional ESLint rules (optional)
      "no-console": "warn",
      "no-unused-vars": "warn",
      // 'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    },
  },
];
