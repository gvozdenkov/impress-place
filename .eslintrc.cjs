module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  ignorePatterns: ["build", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        //always try to resolve types under `<root>@types` directory
        // even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
      node: {
        extensions: [".ts", ".js", ".json"],
      },
    },
    "import/extensions": [".js", ".ts"],
  },
  rules: {
    "prettier/prettier": ["error"],
    semi: "error",
    "no-var": 0,
    "vars-on-top": 0,
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-shadow": 0,
    "no-return-await": "off",
    "@typescript-eslint/return-await": "off",
    "import/no-mutable-exports": 0,
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
  },
};
