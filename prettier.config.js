/** @type {import('prettier').Config} */
module.exports = {
  overrides: [
    {
      files: "*.md",
      options: {
        proseWrap: "always",
      },
    },
  ],
};
