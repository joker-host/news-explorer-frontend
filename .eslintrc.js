module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'react/prop-types': 0,
    indent: ['error', 2],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
  },
};
