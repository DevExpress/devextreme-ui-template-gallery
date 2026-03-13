/* eslint-env node */

// ESLint v9 flat config for the React package.
// This mirrors the previous .eslintrc.js settings in flat-config format.

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'eslint.config.cjs',
      '.eslintrc.js',
    ],

    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        JSX: 'readonly',
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        HTMLElement: 'readonly',
        Blob: 'readonly',
        URLSearchParams: 'readonly',
        CSSStyleRule: 'readonly',
        CSSStyleSheet: 'readonly',
        setTimeout: 'readonly',
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    plugins: {
      react: require('eslint-plugin-react'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'react-perf': require('eslint-plugin-react-perf'),
      import: require('eslint-plugin-import'),
    },

    rules: {
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
      semi: ['error', 'always'],
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', 'never'],
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'eol-last': ['error', 'always'],
      curly: ['error', 'multi-line', 'consistent'],
      indent: [
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
      quotes: ['error', 'single', { avoidEscape: true }],
      'prefer-template': 'error',
      'react/jsx-no-bind': [
        'error',
        {
          allowBind: true, // TODO false (was false)
          allowArrowFunctions: true, // TODO false (was false)
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
          props: 'never',
          children: 'never',
        },
      ],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/self-closing-comp': ['error'],
      '@typescript-eslint/no-unused-vars': ['error'],
      'import/no-default-export': 'error',
    },
  },
];
