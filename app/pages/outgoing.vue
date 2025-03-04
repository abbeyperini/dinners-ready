<script setup lang="ts">
import { type SavedWebhook } from "../../shared/utils/schemas";
const { data: webhooks, refresh } = await useFetch<SavedWebhook[]>("/api/webhook");
async function handleSubmit(e: SubmitEvent) {
  const formData = new FormData(e.target);
  await $fetch("/api/webhook/subscribe", {method: "post", immediate: false, body: {
    nickname: formData.get("nickname"),
    callback: formData.get("url"),
    secret: formData.get("key"),
  }})
  refresh();
}
</script>

<template>
  <h1>Outgoing Sources</h1>
  <ul class="list">
    <li v-for="source in webhooks">
      <div><h2>{{source.name}}</h2><v-btn>Settings</v-btn></div>
    </li>
  </ul>
  <v-form @submit.prevent="handleSubmit">
    <h2>Add Outgoing Source</h2>
    <v-text-field label="Nickname" name="nickname"></v-text-field>
    <v-text-field label="Callback URL" name="url"></v-text-field>
    <v-text-field label="API key" name="key"></v-text-field>
    <v-btn rounded="lg" variant="elevated" type="submit">Add</v-btn>
  </v-form>
</template>

<style scoped>
li {
  margin: 2em;
  list-style: none;
}
form {
  padding: 1em;
  background-color: #E6EFEF;
  border-radius: 36px;
}
</style>