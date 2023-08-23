module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
  },
  ignorePatterns: [
    '**/storybook-static/**',
    '**/.expo/**',
    '**/.yarn/**',
    '.eslintrc.js',
  ],
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
    'sort-imports-es6-autofix',
  ],
  extends: [
    // For what this sets, see: https://typescript-eslint.io/linting/configs#recommended
    'plugin:@typescript-eslint/recommended',
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
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'linebreak-style': ['error', 'unix'],
    // See https://eslint.org/docs/latest/rules/max-len for details/options
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
    'no-console': 'off',
    'no-multiple-empty-lines': 'off',
    'no-shadow': 'off', // Handled by @typescript-eslint
    semi: 'off',
    'sort-imports-es6-autofix/sort-imports-es6': 'error',
    'tsdoc/syntax': 'warn',
    // Complex rules (multiline)
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
    ],
  },
}
