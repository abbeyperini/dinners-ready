<script setup lang="ts">
import { type SavedWebhook } from "../../shared/utils/schemas";
const { data: triggers, refresh: refreshTriggers } = await useFetch("/api/trigger");
const { data: webhooks, refresh } = await useFetch<SavedWebhook[]>("/api/webhook");
async function handleAddSubmit(e: SubmitEvent) {
  const formData = new FormData(e.target);
  await $fetch("/api/webhook/subscribe", {method: "post", immediate: false, body: {
    name: formData.get("name"),
    callback: formData.get("url"),
    secret: formData.get("key"),
  }})
  refresh();
}
async function handleLinkSubmit(webhookId: string, e: SubmitEvent) {
  const formData = new FormData(e.target);
  await $fetch("/api/link", {method: "post", immediate: false, body: { triggerId: formData.get("triggerId"), webhookId: webhookId}})
  refresh();
}
</script>

<template>
  <h1>Outgoing Sources</h1>
  <ul class="list">
    <li v-for="source in webhooks">
      <div></div>
      <h2>{{source.name}}</h2>
      <p>Callback URL: {{source.callback}}</p>
      <p>Secret: {{source.secret}}</p>
      <div>
        <h3 v-if="source.triggers.length > 0">Linked Incoming Sources</h3>
        <ul>
          <li v-for="trigger in source.triggers">{{trigger.name}}</li>
        </ul>
        <v-form @submit.prevent="(e) => handleLinkSubmit(source._id, e)">
          <h3>Link Outgoing Source</h3>
          <v-select label="Incoming" name="triggerId" :items="triggers" item-title="name" item-value="_id"></v-select>
          <v-btn rounded="lg" variant="elevated" type="submit">Link</v-btn>
        </v-form>
      </div>
    </li>
  </ul>
  <v-form @submit.prevent="handleAddSubmit">
    <h2>Add Outgoing Source</h2>
    <v-text-field label="Nickname" name="name"></v-text-field>
    <v-text-field label="Callback URL" name="url"></v-text-field>
    <v-text-field label="API key" name="key"></v-text-field>
    <v-btn rounded="lg" variant="elevated" type="submit">Add</v-btn>
  </v-form>
</template>

<style scoped>
li {
  margin: .5em;
  list-style: none;
}
form {
  padding: 1em;
  background-color: #E6EFEF;
  border-radius: 36px;
}
</style>