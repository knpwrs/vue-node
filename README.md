# vue-node

[![Dependency Status](https://img.shields.io/david/knpwrs/vue-node.svg)](https://david-dm.org/knpwrs/vue-node)
[![devDependency Status](https://img.shields.io/david/dev/knpwrs/vue-node.svg)](https://david-dm.org/knpwrs/vue-node#info=devDependencies)
[![Build Status](https://img.shields.io/travis/knpwrs/vue-node.svg)](https://travis-ci.org/knpwrs/vue-node)
[![Npm Version](https://img.shields.io/npm/v/vue-node.svg)](https://www.npmjs.com/package/vue-node)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Badges](https://img.shields.io/badge/badges-6-orange.svg)](http://shields.io/)

A require hook for loading single-file vue components in node. Useful for
testing without having to spin up web browsers!

## Usage Example

Here is an example of using `vue-node` with [AVA]. The process should be similar
for whatever node testing framework you want to use.

First, make sure you have `vue-node` and [`browser-env`] installed as
development dependencies. If you are running an environment with `vue-loader`
and `webpack@2` then you will already have all required peer dependencies:

```sh
npm i -D vue-node browser-env
```

Now create a setup file called `test/helpers/setup.js`. Putting it in the
`test/helpers` directory will let [AVA] know that this file is not a test.

```js
const browserEnv = require('browser-env');
const hook = require('vue-node');
const { join } = require('path');

// Setup a fake browser environment
browserEnv();
// Pass an absolute path to your webpack configuration to the hook function.
hook(join(__dirname, 'webpack.config.test.js'));
```

Now you can configure AVA to require this file in all test processes. In
`package.json`:

```json
{
  "ava": {
    "require": [
      "./test/helpers/setup.js"
    ]
  }
}
```

Now you can `require` / `import` `.vue` files and test like you would in a
browser! If you need to test DOM updates, I recommend using the [`p-immediate`]
package from npm along with `async` / `await`.

```js
import Vue from 'vue';
import test from 'ava';
import nextTick from 'p-immediate';
import TestComponent from './test.vue';

test('renders the correct message', async (t) => {
  const Constructor = Vue.extend(TestComponent);
  const vm = new Constructor().$mount();
  t.is(vm.$el.querySelector('h1').textContent, 'Hello, World!');
  // Update
  vm.setName('Foo');
  await nextTick();
  t.is(vm.$el.querySelector('h1').textContent, 'Hello, Foo!');
});
```

See the `test` directory in this project for more examples!

## Common Questions

### How does this work?

Node allows developers to hook `require` to load files that aren't JavaScript or
JSON. Unfortunately, require hooks have to be synchronous. Using `vue-loader` on
the other hand, is inherently asynchronous. `vue-node` works by synchronously
running webpack in a separate process and collecting the output to pass to
node's module compilation system. The compilation is done completely in memory
without writing to the filesystem. It also modifies your webpack configuration
to automatically build for node and commonjs with all dependencies of your
component externalized. This means that the built component modules are as small
as possible with dependency resolution left up to node.

### What if I am using vueify?

I am personally more familiar with webpack than browserify, so for the time
being this will only work in combination with webpack. I will gladly accept a
pull request to implement browserify functionality.

## What about testing in web browsers?

Unit testing in web browsers is a very heavy process with many tradeoffs.
Configuration and tooling is tricky as is getting browsers to run in CI. I
personally like saving browsers for end-to-end testing with things like
[`Nightwatch.js`].

## License

**MIT**

[`browser-env`]: https://github.com/lukechilds/browser-env[`Nightwatch.js`]: http://nightwatchjs.org/ "Nightwatch.js | Node.js powered End-to-End testing framework"
[`Nightwatch.js`]: http://nightwatchjs.org/ "Node.js powered End-to-End testing framework"
[`p-immediate`]: https://github.com/sindresorhus/p-immediate "Returns a promise resolved in the next event loop"
[AVA]: https://github.com/avajs/ava "AVA: Futuristic Test Runner"
