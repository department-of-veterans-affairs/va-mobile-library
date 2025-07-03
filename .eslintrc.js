module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: [
    '**/storybook-static/**',
    '**/.expo/**',
    '**/.yarn/**',
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '.eslintrc.js',
  ],
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
    'sort-imports-es6-autofix',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  env: {
    commonjs: true,
    es6: true,
    node: true,
    browser: false,
  },
  root: true,
  rules: {
    // TypeScript rules
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    // General rules
    'linebreak-style': ['error', 'unix'],
    // See https://eslint.org/docs/latest/rules/max-len for details/options
    'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
    'no-console': 'off',
    'no-multiple-empty-lines': 'off',
    'no-shadow': 'off', // Handled by @typescript-eslint
    semi: 'off',
    'sort-imports-es6-autofix/sort-imports-es6': 'error',
    'tsdoc/syntax': 'warn',
  },
  overrides: [
    {
      // JavaScript files - use default parser, disable TypeScript rules
      files: ['**/*.js'],
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        'tsdoc/syntax': 'off',
      },
    },
    {
      // Test and story files - allow empty functions
      files: [
        'packages/components/**/__tests__/**/*.[jt]s?(x)',
        'packages/components/**/?(*.)+(spec|test).[jt]s?(x)',
        '**/*.stories.{ts,tsx}',
      ],
      extends: ['plugin:testing-library/react'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],
}
