module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'quotes': ['error', 'single'],
    'eqeqeq': 'off',
    'no-use-before-define': 'off',
    'no-console': 'off',
    'max-classes-per-file': ['error', 3],
    'import/extensions': [
      'error',
      'always', {
        'js': 'always',
        'mjs': 'never',
        'jsx': 'never'
      }
    ]
  }
}

