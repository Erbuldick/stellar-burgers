module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages',
    '^@components$': '<rootDir>/src/components',
    '^@pages$': '<rootDir>/src/pages',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/services/slices/*.ts',
    '!src/services/slices/index.ts'
  ]
};
