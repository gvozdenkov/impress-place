# Backend for Mesto project

## Techstack

- Typescript
- Mongodb
- Node.js + Express

## Workflow setup

### Eslint

Install deps:

```bash
yarn add -D eslint eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-import-resolver-typescript eslint-plugin-import
```

### Prettier

Install exact versions (I have some bugs with prettier 3)

```bash
yarn add -D prettier@2.8.7 eslint-plugin-prettier@4.2.1 eslint-config-prettier
```

Add to eslint config:

```js
module.exports = {
  extends: [
    // add at the end of array!
    "pretter"
  ],
  plugins: {
    "prettier"
  },
  rules: {
    // highlight prettier errors
    "prettier/prettier": ["error"],
  }
}
```

Add script in `package.json` fix prettier styles:

```json
"scripts": {
  "prettier:write": "prettier --write ./**/*.{ts,js} ./*.{json,md,yml} -l",
}
```
