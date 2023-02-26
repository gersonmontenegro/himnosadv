module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {jsx: true},
    ecmaVersion: 12,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false,
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
    'filename-rules',
    'import',
    'prettier',
    'unicorn',
    'folders',
  ],
  env: {
    jest: true,
    es2021: true,
    browser: true,
  },
  ignorePatterns: [],
  rules: {
    'prettier/prettier': 2,
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    'comma-dangle': ['error', 'always-multiline'],

    'prefer-destructuring': 2,
    camelcase: 2,
    'object-shorthand': 2,
    'no-nested-ternary': 1,

    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,

    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 2,

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 2,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 2,

    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    'react/require-default-props': 0,

    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/function-component-definition': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

    'react-native/no-inline-styles': 2,

    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['[A-Za-z]+.tsx', '[A-Za-z]+.d.ts', '[A-Za-z]+.graphql'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.test.{ts,tsx}'],
      rules: {
        'react-native/no-inline-styles': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 0,
      },
    },
  ],
};
