import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactPerf from 'eslint-plugin-react-perf';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['.eslintrc.js', 'node_modules/**', 'dist/**', 'build/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        JSX: true,
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        FormData: 'readonly',
        Headers: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        Blob: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        HTMLElement: 'readonly',
        URLSearchParams: 'readonly',
        CSSStyleRule: 'readonly',
        CSSStyleSheet: 'readonly',
      },
    },
    plugins: {
      react,
      '@typescript-eslint': tseslint,
      'react-perf': reactPerf,
      'import': importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      'jsx-quotes': ['error', 'prefer-single'],
      'block-spacing': 'error',
      'comma-spacing': 'error',
      'computed-property-spacing': 'error',
      'comma-style': ['error', 'last'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-irregular-whitespace': 'error',
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'no-new-func': 'error',
      'no-eval': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'no-extend-native': 'error',
      'no-alert': 'error',
      'no-whitespace-before-property': 'error',
      'object-curly-spacing': ['error', 'always'],
      'semi-spacing': 'error',
      'semi': ['error', 'always'],
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', 'never'],
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'eol-last': ['error', 'always'],
      'curly': ['error', 'multi-line', 'consistent'],
      'indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          MemberExpression: 1,
          CallExpression: {
            arguments: 1,
          },
        },
      ],
      'multiline-ternary': 'off',
      'quotes': ['error', 'single', { avoidEscape: true }],
      'prefer-template': 'error',
      'react/jsx-no-bind': [
        'error',
        {
          allowBind: true,
          allowArrowFunctions: true,
          ignoreRefs: true,
        },
      ],
      'react/jsx-tag-spacing': [
        'error',
        {
          beforeClosing: 'never',
        },
      ],
      'react/jsx-no-undef': [
        'error',
        {
          allowGlobals: true,
        },
      ],
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': [
        'error',
        {
          enforceDynamicLinks: 'never',
        },
      ],
      'react/display-name': 'off',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          'props': 'never',
          'children': 'never'
        }
      ],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/self-closing-comp': ['error'],
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  },
];
