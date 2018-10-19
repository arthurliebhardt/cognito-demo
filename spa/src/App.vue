<template>
  <div class="container">
    <CognitoDemo />
  </div>
</template>

<script>
import CognitoDemo from './components/CognitoDemo.vue'

export default {
  name: 'app',
  components: {
      CognitoDemo
  }
}
</script>

<style>
  body,html {
    background-color: #f8f9fa!important;
  }
</style>
