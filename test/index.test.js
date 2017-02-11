const { join } = require('path');
const hook = require('../lib/hook');

hook(join(__dirname, 'webpack.config.test.js'));

const Test = require('./test.vue');

console.log(Test._scopeId); // eslint-disable-line
