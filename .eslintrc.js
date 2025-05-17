module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'import'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    webextensions: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Enforce consistent React imports
    'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
    'react/prop-types': 'off', // We're using TypeScript

    // TypeScript specific rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    // Import rules
    'import/no-unresolved': 'off', // TypeScript handles this
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
  },
}; 