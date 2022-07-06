/**
 * ESLint Rules for "Organize Imports" as in TypeScript and VS Code
 *
 * - https://dev.to/tonyhicks20/automatically-organize-imports-dmj
 * - https://devblogs.microsoft.com/typescript/announcing-typescript-2-8-2/#organize-imports
 * - https://www.npmjs.com/package/prettier-plugin-organize-imports
 *
 * @type {import('eslint').Linter.BaseConfig['rules']}
 */
const organizeImportsRules = {
  'import/order': [
    'error',
    {
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],

  // sort-imports is needed for «memberSort»
  // because import/order doesn't know to do it
  'sort-imports': [
    'error',
    {
      ignoreMemberSort: false,
      ignoreCase: true,

      // Others aren't needed for us
      ignoreDeclarationSort: true,
    },
  ],

  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: 'import', next: '*' },
    { blankLine: 'never', prev: 'import', next: 'import' },
  ],
};

/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier', // must be last
  ],
  settings: {
    react: {
      // Hack https://github.com/jaredpalmer/tsdx/issues/279
      version: '999.999.999',
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    ...organizeImportsRules,

    /**
     * @todo
     * We need more hard rules for paths of files than unicorn/filename-case:
     * need to match file name and entries into file, example
     * as eslint-plugin-filenames-simple
     */
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: [
          /**
           * Disable error when camelCase and PascalCase require to rename
           * file from ESLintCheck.tsx to EsLintCheck.tsx or
           * to esLintCheck.tsx. We allow this as PascalCase so extend rule
           * via ignore. Main idea that dashes `-` and underscores `_`
           * are denied in file names.
           */
          /^[\d.A-z]+.[a-z]+$/,
        ],
      },
    ],

    'unicorn/prevent-abbreviations': [
      'error',
      {
        ignore: [
          // Allow to use React-terms
          /[A-z]+Props$/,
          /^props$/,
          /^ref$/,
        ],
      },
    ],
  },
  overrides: [
    // CommonJS and Node.js
    {
      files: ['**/*.js'],
      env: {
        commonjs: true,
        node: true,
      },
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },

    // TypeScript
    {
      files: ['**/*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier', // must be last
      ],
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: [
              './tsconfig.json',
              './lib/tsconfig.json',
              './example/tsconfig.json',
            ],
          },
        },
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // tsconfigRootDir: __dirname, // maybe need in the future
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
        // PropTypes isn't needed for TypeScript
        // https://github.com/eslint/eslint/issues/13284
        'react/prop-types': 'off',
      },
    },

    // TypeScript Jest
    {
      files: ['**/*.spec.tsx'],
      plugins: ['jest'],
      settings: {
        jest: {
          // Own hack based on settings.react.version
          version: 'unknown',
        },
      },
      extends: [
        'plugin:jest/recommended',
        'prettier', // must be last
      ],
      env: {
        'jest/globals': true,
      },
      rules: {
        // You should turn the original rule off *only* for test files
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
    },
  ],
};
