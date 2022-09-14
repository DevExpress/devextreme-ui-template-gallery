module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@vue/eslint-config-airbnb',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-essential',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-underscore-dangle': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vue/require-v-for-key': 'off',
    'class-methods-use-this': 'off',
    'vue/require-valid-default-prop': 'off',
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
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
