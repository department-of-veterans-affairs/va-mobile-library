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
  transformIgnorePatterns: ['jest-runner', '/node_modules/(?!native-base)/'],
}
