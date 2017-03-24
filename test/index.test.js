/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import Vue from 'vue';
import test from 'ava';
import TestComponent from './test.vue';
import TestComponentFromNodePath from 'test.vue';

test('has loaded NODE_PATH', (t) => {
  t.true(_.isFunction(TestComponentFromNodePath.created));
});

test('has a created hook', (t) => {
  t.true(_.isFunction(TestComponent.created));
});

test('sets default data', (t) => {
  t.true(_.isFunction(TestComponent.data));
  t.deepEqual(TestComponent.data(), { name: 'Test' });
});

test('renders the correct message', async (t) => {
  const Constructor = Vue.extend(TestComponent);
  const vm = new Constructor().$mount();
  t.is(vm.$el.querySelector('h1').textContent, 'Hello, World!');
  // Update
  vm.setName('Foo');
  await Vue.nextTick();
  t.is(vm.$el.querySelector('h1').textContent, 'Hello, Foo!');
  // Update directly 👻
  vm._data.name = 'Bar';
  await Vue.nextTick();
  t.is(vm.$el.querySelector('h1').textContent, 'Hello, Bar!');
});
