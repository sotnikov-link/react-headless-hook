// @ts-check

/**
 * JSDoc Parts as RegExp String
 */
const parts = {
  /**
   * Any JSDoc Line Indentation
   */
  indent: '^[ \\t]*',

  /**
   * JSDoc Start /**
   */
  start: '\\/\\*\\*',

  /**
   * JSDoc Middle Line *
   */
  line: {
    start: '\\*',

    get indentedEmpty() {
      return parts.indent + parts.line.start + '\\n';
    },
  },

  /**
   * JSDoc End *\/
   */
  end: '\\*\\/',
};

module.exports = {
  plugins: ['regex'],

  rules: {
    'regex/invalid': [
      'warn',
      [
        // Start rules

        {
          message: 'JSDoc is always a block comment', // ok
          // /** Bad example */
          regex:
            // '^(' + parts.indent + parts.start + ')(.*)(' + parts.end + ')$',
            `^(${parts.indent})(${parts.start})(.*)(${parts.end})$`,
          replacement: {
            function: `return $[2] + "\\n *" + $[3] + "\\n" + $[4]`,
          },
        },

        {
          message: 'JSDoc with empty line before', // ok
          // const previous = 'variable';
          //
          // /**
          //  * Good example
          //  */
          // const good = 'example';
          regex: `([,;)\\]}>]\\n)(${parts.indent + parts.start})`,
          replacement: {
            function: 'return $[1] + "\\n" + $[2]',
          },
        },

        {
          message: 'JSDoc starts without empty line', // ok
          // /**
          //  *
          //  * Bad example
          //  */
          regex: [
            `(${parts.indent + parts.start})`,
            `(${parts.line.indentedEmpty})+`,
          ].join('\\n'),
          replacement: {
            function: 'return $[1] + "\\n"',
          },
        },

        // Line rules

        {
          message: 'JSDoc line contains space after asterisk', // ok
          // /**
          //  *Bad example
          //  */
          regex: `(^${parts.indent + parts.line.start})([^ \\n/])`,
          replacement: {
            function: 'return $[1] + " " + $[2]',
          },
        },

        {
          message: 'JSDoc can contains only one empty line but many times', // ok
          // /**
          //  * Mixed example
          //  *
          //  * One empty line is OK.
          //  *
          //  * Next one empty line is OK too.
          //  *
          //  *
          //  * More two empty lines is bad.
          //  */
          regex: `(^${parts.indent + parts.line.start}\\n)(^${
            parts.indent + parts.line.start
          }\\n)+`,
          replacement: {
            function: 'return $[1]',
          },
        },

        // End rules

        {
          message: 'JSDoc without empty line after', // ok
          // /**
          //  * Bad example
          //  */
          //
          // const bad = 'example';
          regex: `(^${parts.indent + parts.end})\\n+(\\n)`,
          replacement: {
            function: 'return $[1] + $[2]',
          },
        },

        {
          message: 'JSDoc ends without empty line', // ok
          // /**
          //  * Bad example
          //  *
          //  */
          regex: `${parts.line.indentedEmpty}(${parts.indent + parts.end})`,
          replacement: {
            function: 'return $[1]',
          },
        },
      ],
    ],
  },
};
