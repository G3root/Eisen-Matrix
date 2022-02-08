module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testMatch:[ "**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]
  };