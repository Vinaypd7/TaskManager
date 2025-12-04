module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // project-specific rule overrides can go here
  },
  overrides: [
    {
      files: [
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/*.test.{ts,tsx,js,jsx}',
        '**/*.stories.{ts,tsx,js,jsx}'
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ],
};
