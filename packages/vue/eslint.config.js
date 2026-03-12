/* eslint-env node */

// ESLint v9 flat config for the Vue package.
// Mirrors the previous .eslintrc.js settings.

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    ignores: ['dist/**', 'build/**', 'node_modules/**', '**/eslint.config.js', '**/.eslintrc.js', 'vite.config.ts'],

    languageOptions: {
      parser: require('vue-eslint-parser'),
      parserOptions: {
        parser: require('@typescript-eslint/parser'),
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: false,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
      },
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
    },

    plugins: {
      vue: require('eslint-plugin-vue'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      import: require('eslint-plugin-import'),
      'vuejs-accessibility': require('eslint-plugin-vuejs-accessibility'),
    },

    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'vuejs-accessibility/click-events-have-key-events': 'off',
      'vuejs-accessibility/label-has-for': 'off',
      'vue/require-v-for-key': 'off',
      'class-methods-use-this': 'off',
      'vue/require-valid-default-prop': 'off',
      'linebreak-style': 'off',
      'import/prefer-default-export': 'off',
      'default-param-last': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: 1,
      }],
    },
  },
  {
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    languageOptions: {
      globals: {
        jest: 'readonly',
      },
    },
  },
];
