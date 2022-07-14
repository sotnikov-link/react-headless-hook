// @ts-check

module.exports = {
  plugins: ['import', 'unused-imports'],

  extends: ['plugin:import/recommended'],

  /**
   * ESLint Rules instead of TypeScript Organize Imports and VS Code
   *
   * - https://dev.to/tonyhicks20/automatically-organize-imports-dmj
   * - https://devblogs.microsoft.com/typescript/announcing-typescript-2-8-2/#organize-imports
   * - https://www.npmjs.com/package/prettier-plugin-organize-imports
   *
   * @type {import('eslint').Linter.BaseConfig['rules']}
   */
  rules: {
    'import/order': [
      'warn',
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
      'warn',
      {
        ignoreMemberSort: false,
        ignoreCase: true,

        // Others aren't needed for us
        ignoreDeclarationSort: true,
      },
    ],

    /**
     * Don't forget part of padding-line-between-statements
     * @see {paddingLineBetweenStatements}
     */
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      // Maybe for the future
      // {
      //   vars: 'all',
      //   varsIgnorePattern: '^_',
      //   args: 'after-used',
      //   argsIgnorePattern: '^_',
      // },
    ],
  },
};
