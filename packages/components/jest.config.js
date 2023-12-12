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
    '../../node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
}
