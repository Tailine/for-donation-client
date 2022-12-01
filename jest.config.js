module.exports = {
  testPathIgnorePatterns: ['/node_modules', '/next/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)?'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setupTests.ts'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src']
}
