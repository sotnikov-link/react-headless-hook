// @ts-check

// All Rules without conflicts with Prettier

const imports = require('./eslint/imports');
const jsDoc = require('./eslint/jsDoc');

/**
 * Over Prettier Rules
 * @type {import('eslint').Linter.BaseConfig['rules']}
 */
const overPrettierRules = {
  'react/jsx-newline': [
    'warn',
    {
      prevent: false,
      // allowMultilines: true, // will be added next versions
    },
  ],
};

/**
 * lines-between-class-members
 * @see https://eslint.org/docs/latest/rules/lines-between-class-members
 * @type {import('eslint').Linter.RuleEntry}
 */
const linesBetweenClassMembers = [
  'warn',
  'always',
  { exceptAfterSingleLine: true },
];

/**
 * padding-line-between-statements
 * @see https://eslint.org/docs/latest/rules/padding-line-between-statements
 * @type {import('eslint').Linter.RuleEntry}
 */
const paddingLineBetweenStatements = [
  'warn',

  // Separated Import Group for organizeImportsRules
  { blankLine: 'always', prev: '*', next: 'import' },
  { blankLine: 'always', prev: 'import', next: '*' },
  { blankLine: 'never', prev: 'import', next: 'import' },

  // Separated Export Group
  { blankLine: 'always', prev: '*', next: 'export' },
  { blankLine: 'always', prev: 'export', next: '*' },
  { blankLine: 'any', prev: 'export', next: 'export' },

  // Separated Singleline Variable Group
  { blankLine: 'always', prev: '*', next: 'singleline-var' },
  { blankLine: 'always', prev: 'singleline-var', next: '*' },
  { blankLine: 'any', prev: 'singleline-var', next: 'singleline-var' },
  { blankLine: 'always', prev: '*', next: 'singleline-let' },
  { blankLine: 'always', prev: 'singleline-let', next: '*' },
  { blankLine: 'any', prev: 'singleline-let', next: 'singleline-let' },
  { blankLine: 'always', prev: '*', next: 'singleline-const' },
  { blankLine: 'always', prev: 'singleline-const', next: '*' },
  { blankLine: 'any', prev: 'singleline-const', next: 'singleline-const' },

  // Always Before
  {
    blankLine: 'always',
    prev: '*',
    next: [
      'break',
      'throw',
      'return',
      'directive',
      'multiline-expression',

      // equals to 'try', 'class', 'switch', 'function'
      'block-like',

      // switch-case
      'case',
      'default',

      // multiline variable group
      'multiline-var',
      'multiline-let',
      'multiline-const',
    ],
  },

  // Always After
  {
    blankLine: 'always',
    prev: [
      'directive',
      'block-like',
      'multiline-var',
      'multiline-let',
      'multiline-const',
      'multiline-expression',
    ],
    next: '*',
  },
];

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
      ...imports.plugins,
      'only-warn', // errors for tsc, warns for format
      ...jsDoc.plugins,
      'prettier',
    ]),
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    imports.extends,
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier', // must be last
  ],
  settings: { react: { version: require('react/package.json').version } },
  rules: {
    ...overPrettierRules,
    ...imports.rules,
    ...jsDoc.rules,

    'lines-between-class-members': linesBetweenClassMembers,

    'padding-line-between-statements': paddingLineBetweenStatements,

    'react/button-has-type': 'warn', // many don't know that default is submit

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
        ...overPrettierRules,

        // PropTypes isn't needed for TypeScript
        // https://github.com/eslint/eslint/issues/13284
        'react/prop-types': 'off',

        // We use eslint-plugin-unused-imports
        '@typescript-eslint/no-unused-vars': 'off',

        '@typescript-eslint/array-type': ['warn', { default: 'generic' }],

        // https://typescript-eslint.io/rules/lines-between-class-members/
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': [
          ...linesBetweenClassMembers,
          { exceptAfterOverload: true },
        ],

        // https://typescript-eslint.io/rules/padding-line-between-statements
        'padding-line-between-statements': 'off',
        '@typescript-eslint/padding-line-between-statements': [
          ...paddingLineBetweenStatements,

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
        ],
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
        ...overPrettierRules,

        // You should turn the original rule off only for test files
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'warn',
      },
    },
  ],
};
