module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@vue/eslint-config-airbnb',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
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
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
    'default-param-last': 'off',
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: 1,
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
