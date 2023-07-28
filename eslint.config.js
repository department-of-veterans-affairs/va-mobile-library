module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
    'sort-imports-es6-autofix',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended', // For what this sets, see: https://typescript-eslint.io/linting/configs#recommended
    'prettier',
  ],
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: false,
  },
  root: true,
  rules: {
    // Simple rules (one line)
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'linebreak-style': ['error', 'unix'],
    'max-len': 120, // See https://eslint.org/docs/latest/rules/max-len for details/options
    'no-console': 'off',
    'no-multiple-empty-lines': 'off',
    'no-shadow': 'off', // Handled by @typescript-eslint
    semi: 'off',
    'sort-imports-es6-autofix/sort-imports-es6': 'error',
    'tsdoc/syntax': 'warn',
    // Complex rules (multiline)
  },
}
