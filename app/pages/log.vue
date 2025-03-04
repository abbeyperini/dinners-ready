<script setup lang="ts">
import { type SavedWebhook } from "../../shared/utils/schemas";
const { data: webhooks } = await useFetch<SavedWebhook[]>("https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/trigger");
  const id = ref(null);
const logs = computed(async () => {
  if (id.value) {
    const { data } = await useFetch(`https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/webhook/logs/${id.value}`);
    return data;
  }
  return [];
})
</script>

<template>
  <h1>Message Log</h1>
  <v-select label="Select Source" :items="webhooks"></v-select>
  <ul>
    <li v-for="log in logs">
      <h2>{{log.name}}</h2>
      <p>{{log.data}}</p>
    </li>
  </ul>
</template>

<style scoped>

</style>