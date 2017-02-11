<template>
  <div>
    <h1>Hello, {{ name }}!</h1>
  </div>
</template>

<script>
import capitalize from './helpers/capitalize';

export default {
  data() {
    return {
      name: capitalize('test'),
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
