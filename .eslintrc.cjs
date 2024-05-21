// eslint-disable-next-line
const stylistic = require('@stylistic/eslint-plugin')

const stylisticConfig = stylistic.configs.customize({
  indent: 2,
  quotes: 'single',
  semi: false,
  jsx: true,
})

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports', 'perfectionist', '@stylistic'],
  rules: {
    'sort-imports': 'off',

    'no-dupe-class-members': 'off',
    'no-loss-of-precision': 'off',
    'no-redeclare': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',

    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/ban-types': ['error', { types: { Function: false } }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
    '@typescript-eslint/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
    '@typescript-eslint/no-useless-constructor': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/unified-signatures': 'off',

    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': 'off',
    'import/newline-after-import': ['error', { count: 1 }],

    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: '^_',
      },
    ],

    'perfectionist/sort-imports': [
      'error',
      {
        'type': 'natural',
        'order': 'asc',
        'groups': [
          'mantineStyles',
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'style',
          'object',
          'unknown',
        ],
        'custom-groups': {
          value: {
            mantineStyles: '@mantine/**/*.css',
          },
        },
        'newlines-between': 'always',
      },
    ],
    'perfectionist/sort-named-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-exports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-named-exports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
      },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: ['multiline', 'unknown', 'shorthand'],
      },
    ],
    'perfectionist/sort-classes': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: [
          'index-signature',
          'static-property',
          'private-property',
          'property',
          'constructor',
          'static-method',
          'private-method',
          'static-private-method',
          'method',
          ['get-method', 'set-method'],
          'unknown',
        ],
      },
    ],

    ...stylisticConfig.rules,
  },
  ignorePatterns: [
    'node_modules',
    'public',
    'dist',
  ],
}
