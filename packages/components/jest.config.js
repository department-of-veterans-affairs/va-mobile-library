module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        babelConfig: 'babel.config.js',
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  setupFiles: [
    '../../node_modules/react-native-gesture-handler/jestSetup.js',
    './jest/testSetup.ts',
  ],
  transformIgnorePatterns: [
    '../../node_modules/(?!react-native|any-react-native-esm-package)',
    'jest-runner',
  ],
}
