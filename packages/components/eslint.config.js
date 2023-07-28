/** Note: eslint automatically merges in lower level eslint config files */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['@react-native-community', 'plugin:react-hooks/recommended'],
}
