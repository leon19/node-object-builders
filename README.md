# @lleon/object-builders

[![npm (scoped)](https://img.shields.io/npm/v/@lleon/object-builders)](https://www.npmjs.com/package/@lleon/object-builders)
[![Travis (.org)](https://img.shields.io/travis/leon19/node-object-builders)](https://travis-ci.org/leon19/node-object-builders)
[![Coverage Status](https://coveralls.io/repos/github/leon19/node-object-builders/badge.svg?branch=master)](https://coveralls.io/github/leon19/node-object-builders?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Library to easily create object builders, useful for testing or for generating seed data.

This library requires
[ES Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
to work. So be sure your browser or the node version you're using supports proxies.

- [Installation](#installation)
  - [fromInterface()](#frominterface)
  - [fromClassObject()](#fromclassobject)
  - [fromClassConstructor()](#fromclassconstructor)
  - [fromFactory()](#fromfactory)
- [Development](#development)
  - [yarn build](#yarn-build)
  - [yarn build:commonjs](#yarn-build-commonjs)
  - [yarn build:esm](#yarn-build-esm)
  - [yarn clean](#yarn-clean)
  - [yarn test](#yarn-test)
  - [yarn cover](#yarn-cover)
  - [yarn lint](#yarn-lint)
  - [yarn lint:fix](#yarn-lint-fix)

## Installation

```sh
yarn add @lleon/object-builders

# or using npm...
npm install @lleon/object-builders
```

### fromInterface()

Creates a new object builder typed from an interface

```ts
import { fromInterface } from '@lleon/object-builders';

interface User {
  name: string;
}

const user = fromInterface<User>()
  .name.set('John')
  .build();

console.log(user.name); // prints "John"
```

### fromClassObject()

Creates a new object builder from the given class. The properties that can be set are the same
properties as the class has.

When using this builder object is instantiated using `Object.create` so the function constructor is
never called.

This is a good builder when using in conjunction with
[class-transformer](https://www.npmjs.com/package/class-transformer) and
[class-validator](https://www.npmjs.com/package/class-validator)

```ts
import { fromClassObject } from '@lleon/object-builders';
import { IsString } from 'class-validator';

class User {
  @IsString()
  name!: string;
}

const user = fromClassObject(User)
  .name.set('John')
  .build();

console.log(user instanceof User); // prints `true`
console.log(user.name); // prints "John"
```

### fromClassConstructor()

Creates a new object builder from the given class. The class must receive an object as unique
argument. In this case the object is instantiated using the `new` operator

```ts
import { fromClassConstructor } from '@lleon/object-builders';

class User {
  givenName: string;
  familyName: string;

  constructor({ firstName, lastName }: { firstName: string; lastName: string }) {
    this.givenName = firstName;
    this.familyName = lastName;
  }
}

// the available builder properties are the properties that receives the constructor
const user = fromClassConstructor(User)
  .firstName.set('John')
  .lastName.set('Doe')
  .build();

console.log(user instanceof User); // prints `true`
console.log(user.givenName); // prints "John"
console.log(user.familyName); // prints "Doe"
```

### fromFactory()

Creates a new builder using the given factory function. Using a factory allow you to return any type
you want not just objects

```ts
import { fromFactory } from '@lleon/object-builders';

const factory = (properties: Partial<{ userName: string }>): string => {
  return properties.userName || '';
};

const userName = fromFactory(factory)
  .userName.set('john.doe1')
  .build();

console.log(userName === 'john.doe1'); // prints `true`
```

## Development

The project use [husky](https://github.com/typicode/husky) and
[lint-staged](https://github.com/okonet/lint-staged) for linting and fixing possible errors on
source code before commit

### yarn build

Concurrently run `build:commonjs` and `build:esm`

### yarn build:commonjs

Compile typescript files from the `src` folder inside the `lib` folder

### yarn build:esm

Compile typescript files from the `src` folder inside the `esm` folder using ES modules

### yarn clean

Remove the following directories/files

- **lib**
- **esm**
- **reports**

### yarn test

Run tests files inside the `tests` and `src` folders that matches the following patterns. Exit with
code > 0 on error

- **\*.test.ts**
- **\*.spec.ts**

### yarn cover

> For some reason this script does not work when used with `yarn` so it is needed to launch with npm
> `npm run cover`

The same as as `yarn test` and generates coverages reports in `reports/coverage`. Exit with code > 0
on error

### yarn lint

Check eslint errors according to `.eslintrc`

### yarn lint:fix

Run `yarn lint` applying fixes and run prettier on every typescript file
