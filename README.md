# @lleon/object-builders

## Development

The project use [husky](https://github.com/typicode/husky) and
[lint-staged](https://github.com/okonet/lint-staged) for linting and fixing possible errors on
source code before commit

Git hooks scripts are installed after running `yarn` the first time

### yarn build:commonjs

Compile typescript files from the `src` folder inside the `lib` folder

### yarn build:esm

Compile typescript files from the `src` folder inside the `esm` folder using es modules

### yarn build

Concurrently run both `build:commonjs` and `build:esm`

### yarn clean

Remove the following directories/files

- **lib**
- **esm**
- **reports**

### yarn test

Run tests files inside the `tests` folder that matches the following patterns. Exit with code > 0 on
error

- **\*.test.ts**
- **\*.spec.ts**

### yarn cover

The same as as `yarn test` and generates coverages reports in `reports/coverage`. Exit with code > 0
on error

### yarn lint

Check eslint errors according to `.eslintrc`

### yarn lint:fix

Run `yarn lint` applying fixes and run prettier on every typescript file
