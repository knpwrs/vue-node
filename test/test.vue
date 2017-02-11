<template>
  <h1>Hello, {{ name }}!</h1>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      name: _.capitalize('world'),
    };
  },
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>
