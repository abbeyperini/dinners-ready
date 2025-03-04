<script setup lang="ts">
const triggers = useFetch("https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/webhook");
const id = ref(null);
const logs = computed(() => {
  let data = [];
  if (id.value) {
    data = useFetch(`https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/webhook/logs/${id.value}`);
  }
  return data;
})
</script>

<template>
  <h1>Message Log</h1>
  <v-select label="Select Source" :items="triggers.data"></v-select>
  <ul>
    <li v-for="log in logs.data">
      <h2>{{log.name}}</h2>
      <p>{{log.data}}</p>
    </li>
  </ul>
</template>

<style scoped>

</style>