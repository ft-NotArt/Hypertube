//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';

export default [
  {
    ignores: [
      'dist/**',
      'build/**',
      'coverage/**',
      '.output/**',
      '.vinxi/**',
      'eslint.config.js',
      'prettier.config.js',
    ],
  },
  ...tanstackConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/key-spacing': [
        'error',
        { beforeColon: false, afterColon: true },
      ],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-infix-ops': 'error',
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
];
