<script setup lang="ts">
import { type SavedWebhook } from "../../shared/utils/schemas";
const { data: webhooks } = await useFetch<SavedWebhook[]>("https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/trigger");
async function handleSubmit(data) {
  await useFetch("https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/webhook/subscribe", {method: "post", immediate: false, body: data})
}
</script>

<template>
  <h1>Outgoing Sources</h1>
  <ul>
    <li v-for="source in webhooks">
      <div><h2>{{source.name}}</h2><v-btn>Settings</v-btn></div>
    </li>
  </ul>
  <v-form @submit.prevent="handleSubmit">
    <h2>Add Outgoing Source</h2>
    <v-text-field label="Nickname"></v-text-field>
    <v-text-field label="Callback URL"></v-text-field>
    <v-text-field label="API key"></v-text-field>
    <v-btn rounded="lg" variant="elevated" type="submit">Add</v-btn>
  </v-form>
</template>

<style scoped>

</style>