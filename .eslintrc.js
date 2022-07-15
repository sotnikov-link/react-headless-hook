// @ts-check

const emptyLines = require('./eslint/emptyLines');
const imports = require('./eslint/imports');
const jsDoc = require('./eslint/jsDoc');

// Additional Prettier rules without conflicts
const additionalPrettierRules = {
  ...imports.rules,
  ...jsDoc.rules,
  ...emptyLines.rules,
};

/**
 * @type {import('eslint').Linter.BaseConfig}
 */
module.exports = {
  env: { browser: true, es2021: true },
  plugins: [
    ...new Set([
      'react',
      'react-hooks',
      'jsx-a11y',
      ...emptyLines.plugins,
      ...imports.plugins,
      'only-warn', // errors for tsc, warns for format
      ...jsDoc.plugins,
      'prettier',
    ]),
  ],
  extends: [
    ...new Set([
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      ...imports.extends,
      'plugin:unicorn/recommended',
      'plugin:prettier/recommended',
      'prettier', // must be last
    ]),
  ],
  settings: { react: { version: require('react/package.json').version } },
  rules: {
    ...additionalPrettierRules,

    'react/button-has-type': 'warn', // because default is submit

    'react/react-in-jsx-scope': 'off', // tsconfig.json defines JSX imports

    /**
     * @todo
     * We need more hard rules for paths of files than unicorn/filename-case:
     * need to match file name and entries into file, example
     * as eslint-plugin-filenames-simple
     */
    'unicorn/filename-case': [
      'warn',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },

        // Disable when camelCase and PascalCase require to rename file
        // from ESLintCheck.tsx to EsLintCheck.tsx or to esLintCheck.tsx.
        // We allow this as PascalCase so extend rule via ignore. The main
        // idea that dashes `-` and underscores `_` are denied in file names.
        ignore: [/^[\d.A-z]+.[a-z]+$/],
      },
    ],

    'unicorn/prevent-abbreviations': [
      'warn',
      {
        checkProperties: true,
        ignore: [
          /acc/i,
          /doc/i,
          /prev/i,
          /env/i,

          // Allow to use React-terms
          /props?/i,
          /ref/i,
        ],
      },
    ],
  },
  overrides: [
    // CommonJS and Node.js
    {
      files: ['**/*.js'],
      env: { commonjs: true, node: true },
      rules: { 'unicorn/prefer-module': 'off' },
    },

    // TypeScript
    {
      files: ['**/*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        'prettier', // must be last
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // tsconfigRootDir: __dirname, // maybe for the future
        sourceType: 'module',
        project: [
          './tsconfig.json',
          './lib/tsconfig.json',
          './example/tsconfig.json',
        ],
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        ...additionalPrettierRules,

        // PropTypes isn't needed for TypeScript
        // https://github.com/eslint/eslint/issues/13284
        'react/prop-types': 'off',

        // We use eslint-plugin-unused-imports
        '@typescript-eslint/no-unused-vars': 'off',

        '@typescript-eslint/array-type': ['warn', { default: 'generic' }],

        // https://typescript-eslint.io/rules/lines-between-class-members/
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members':
          emptyLines.extendLinesBetweenClassMembers({
            exceptAfterOverload: true,
          }),

        // https://typescript-eslint.io/rules/padding-line-between-statements
        'padding-line-between-statements': 'off',
        '@typescript-eslint/padding-line-between-statements':
          emptyLines.extendsPaddingLineBetweenStatements([
            // Always Before
            {
              blankLine: 'always',
              prev: '*',
              next: ['type', 'interface'],
            },

            // Always After
            {
              blankLine: 'always',
              prev: ['type', 'interface'],
              next: '*',
            },
          ]),
      },
    },

    // TypeScript Jest
    {
      files: ['**/*.spec.tsx'],
      plugins: ['jest'],
      settings: { jest: { version: require('jest/package.json').version } },
      extends: [
        'plugin:jest/recommended',
        'prettier', // must be last
      ],
      env: {
        'jest/globals': true,
      },
      rules: {
        ...additionalPrettierRules,

        // You should turn the original rule off only for test files
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'warn',
      },
    },
  ],
};
