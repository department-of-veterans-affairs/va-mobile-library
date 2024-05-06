module.exports = {
  preset: '@testing-library/react-native',
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
  moduleNameMapper: {
    '\\.svg': '<rootDir>/jest/svgMock.ts',
  },
  setupFiles: [
    '../../node_modules/react-native-gesture-handler/jestSetup.js',
    './jest/nativeModulesSetup.ts',
  ],
  setupFilesAfterEnv: ['./jest/jestSetup.ts'],
  transformIgnorePatterns: ['jest-runner', '/node_modules/(?!native-base)/'],
}
