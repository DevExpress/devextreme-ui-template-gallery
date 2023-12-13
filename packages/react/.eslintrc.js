/* eslint-env node */
module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2021': true
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'overrides': [
  ],
  'globals': {
    'JSX': true,
  },
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': ['react', '@typescript-eslint', 'react-perf', 'import'],
  'rules': {
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
        'props': 'never',
        'children': 'never'
      }
    ],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/self-closing-comp': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/no-default-export': 'error',
  }
};
