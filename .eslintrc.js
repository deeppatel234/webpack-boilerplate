const path = require("path");
const babelConfig = require("./build/babel.config");

module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ["airbnb", "prettier", "plugin:jsx-a11y/recommended"],
  plugins: ["react", "react-hooks", "prettier", "jsx-a11y"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      ...babelConfig(),
    },
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: path.join(__dirname, "./build/webpack.prod.js"),
      },
    },
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-underscore-dangle": "error",
    "import/newline-after-import": "error",
    "import/imports-first": ["error", "absolute-first"],
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: ["**/build/*"] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
