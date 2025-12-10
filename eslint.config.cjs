const { FlatCompat } = require('@eslint/eslintrc');

const legacy = {
  extends: ['google', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  plugins: ['prettier', 'jsx-a11y', 'compat', 'react'],
  settings: {
    polyfills: ['fetch', 'promises'],
    react: {
      version: 'detect'
    }
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
    }
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  rules: {
    strict: 0,
    'compat/compat': 2,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-find-dom-node': 0,
    'react/no-unescaped-entities': 0,
    'require-jsdoc': 0,
    quotes: ['warn', 'single', { avoidEscape: true }],
    'global-require': 'off',
    'new-cap': [
      'error',
      {
        capIsNew: false
      }
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        singleQuote: true,
        printWidth: 120
      }
    ],
    skipBlankLines: 0,
    'func-call-spacing': ['error', 'never'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'object-curly-spacing': ['error', 'always'],
    'multiline-ternary': 0,
    'one-var': [
      'error',
      {
        initialized: 'never'
      }
    ],
    'guard-for-in': 0,
    'no-invalid-this': 0,
    'no-console': 0,
    'no-debugger': 1,
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'array-bracket-spacing': [
      2,
      'never',
      {
        objectsInArrays: false
      }
    ],
    'no-trailing-spaces': [
      'error',
      {
        skipBlankLines: true
      }
    ],
    'no-unused-vars': ['error', { ignoreRestSiblings: true, args: 'none' }],
    camelcase: 'off'
  }
};

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const sanitizedLegacy = {
  ...legacy,
  extends: Array.isArray(legacy.extends) ? legacy.extends.filter(e => e !== 'google') : legacy.extends
};

module.exports = [
  ...compat.config(sanitizedLegacy),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: require('@babel/eslint-parser'),
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
        }
      }
    }
  },
  {
    ignores: ['build/', '/src/js/Spritesheet.old.js']
  }
];
