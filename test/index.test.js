import _ from 'lodash';
import test from 'ava';
import TestComponent from './test.vue';

test('it works!', (t) => {
  t.true(_.isString(TestComponent._scopeId)); // eslint-disable-line no-underscore-dangle
});
