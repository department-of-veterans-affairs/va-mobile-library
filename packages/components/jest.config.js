module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js', './jest/testSetup.ts'],
  transformIgnorePatterns: ['jest-runner', '/node_modules/(?!native-base)/'],
}
