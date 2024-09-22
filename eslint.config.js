// eslint.config.js
const eslintRecommended = require('eslint/use-at-your-own-risk').builtinRules;
const prettierConfig = require('eslint-plugin-prettier').configs.recommended;

module.exports = [
  {
    files: ['**/*.js'],  // Lint all JavaScript files
    languageOptions: {
      ecmaVersion: 2021,  // ECMAScript version
      sourceType: 'module'
    },
    plugins: {
      prettier: require('eslint-plugin-prettier')
    },
    rules: {
      ...eslintRecommended,           // Spread ESLint recommended rules
      ...prettierConfig.rules,        // Spread Prettier recommended rules
      'prettier/prettier': 'error'    // Show Prettier issues as ESLint errors
    }
  }
];
