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

### Commit check

This project is [Commitizen](https://www.npmjs.com/package/commitizen?activeTab=readme) friendly. So
you can easy create commits in a step by step guide by run:

```bash
yarn cz
```

If you are mannually create commit message it will be linted with `commitlint` to lint commit
messages acording with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

- `husky` & `lint-stage` to fix & lint staged files before commit.
- `commitlint` to lint commit message according
  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Install deps:

```bash
yarn add -D cz-git commitizen @commitlint/cli @commitlint/config-conventional @commitlint/format
```

## Local dev with Docker

To start local dev in docker container use `makefile`:

```bash
make run-dev
# and
make stop-dev
```

This will build docker image & run container with volume connected to `./src` on
`http:localhost:3000`

## Local dev without Docker

I use `tsx` to run `.ts` file with ESM modules support

```bash
yarn dev
```
