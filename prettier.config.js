/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true, // for ts-standard
  semi: false, // for ts-standard
  overrides: [
    {
      files: "*.md",
      options: {
        proseWrap: "always",
      },
    },
  ],
};
