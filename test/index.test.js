import _ from 'lodash';
import Vue from 'vue';
import test from 'ava';
import TestComponent from './test.vue';

test('works like it does in a browser', (t) => {
  const Constructor = Vue.extend(TestComponent);
  const vm = new Constructor().$mount();
  t.is(vm.$el.querySelector('h1').textContent, 'Hello, World!');
});

test('sets default data', (t) => {
  t.true(_.isFunction(TestComponent.data));
  t.deepEqual(TestComponent.data(), { name: 'World' });
});
