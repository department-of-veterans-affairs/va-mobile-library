module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        babelConfig: 'babel.config.js',
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    '\\.svg': '<rootDir>/jest/svgMock.ts',
  },
  setupFiles: [
    '../../node_modules/react-native-gesture-handler/jestSetup.js',
    './jest/nativeModulesSetup.ts',
  ],
  setupFilesAfterEnv: ['./jest/jestSetup.ts'],
  testEnvironment: 'node',
  transformIgnorePatterns: ['jest-runner', '/node_modules/(?!native-base)/'],
}
