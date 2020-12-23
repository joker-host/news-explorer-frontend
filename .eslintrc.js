module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react',
    'import',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'react/prop-types': 0,
    'default-case': 0,
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',
    eqeqeq: 'off',
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    indent: ['error', 2],
  },
};
