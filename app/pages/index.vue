<script setup lang="ts">
const testData = await useFetch("/api/test");
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <p>Hi.</p>
    <pre>{{testData}}</pre>
  </div>

</template>

<style scoped>

</style>
