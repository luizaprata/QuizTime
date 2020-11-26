const jestPreset = require('@testing-library/react-native/jest-preset')

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov'],
  setupFiles: [
    '<rootDir>/jest.setup.js',
    ...jestPreset.setupFiles,
    './node_modules/@testing-library/react-native/jest-preset',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
}
