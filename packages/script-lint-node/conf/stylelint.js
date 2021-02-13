module.exports = {
  plugins: ["stylelint-order"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-idiomatic-order",
    "stylelint-order",
    "stylelint-cmd-prettier",
  ],
  rules: {
    indentation: "tab",
  },
};
