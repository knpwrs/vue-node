<template>
  <div>
    <h1>Hello, {{ name }}!</h1>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      name: _.capitalize('test'),
    };
  },
  created() {
    this.name = 'World';
  },
  methods: {
    setName(name) {
      this.name = name;
    },
  },
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>
