<script setup lang="ts">
import { type SavedWebhook } from "../../shared/utils/schemas";
const { data: triggers, refresh } = await useFetch("/api/trigger");
const { data: webhooks } = await useFetch<SavedWebhook[]>("/api/webhook");
const secret = ref("");
const sourceName = ref("");
const showSecretBanner = ref(false);
async function handleAddSubmit(e: SubmitEvent) {
  const formData = new FormData(e.target as HTMLFormElement);
  const triggerResponse = await $fetch("/api/trigger/add", {method: "post", immediate: false, body: { name: formData.get("name")}});
  secret.value = triggerResponse.secret;
  sourceName.value = triggerResponse.name;
  showSecretBanner.value = true;
  refresh();
}
async function handleLinkSubmit(triggerId: string, e: SubmitEvent) {
  const formData = new FormData(e.target as HTMLFormElement);
  await $fetch("/api/link", {method: "post", immediate: false, body: { triggerId: triggerId, webhookId: formData.get("webhookId")}})
  refresh();
}
function copySecret() {
  navigator.clipboard.writeText(secret.value);
}
</script>

<template>
  <v-banner
    v-if="showSecretBanner"
    class="my-4"
    color="warning"
    icon="$warning"
    lines="one">
    <v-banner-text><p>{{sourceName}} secret: {{secret}}</p></v-banner-text>
    <template v-slot:actions>
      <v-btn type="button" @click="copySecret">Copy Secret</v-btn>
      <v-btn type="button" @click="showSecretBanner = false">
        Dismiss
      </v-btn>
    </template>
  </v-banner>
  <h1>Incoming Sources</h1>
  <ul>
    <li v-for="source in triggers" class="container">
      <div>
        <h2>{{source.name}}</h2>
        <p>id: /api/trigger/{{source._id}}</p>
      </div>
      <div>
        <h3 v-if="source.webhooks.length > 0">Linked Outgoing Sources</h3>
        <ul>
          <li v-for="webhook in source.webhooks">
            <h4>{{webhook?.name}}</h4>
            <p>Callback URL: {{webhook?.callback}}</p>
            <p>Secret: {{webhook?.secret}}</p>
          </li>
        </ul>
      </div>
      <v-form @submit.prevent="(e) => handleLinkSubmit(source._id, e)">
        <h3>Link Outgoing Source</h3>
        <v-select label="Outgoing" name="webhookId" :items="webhooks" item-title="name" item-value="_id"></v-select>
        <v-btn rounded="lg" variant="elevated" type="submit">Link</v-btn>
      </v-form>
    </li>
  </ul>
  <v-form @submit.prevent="handleAddSubmit">
    <h2>Add Incoming Source</h2>
    <v-text-field label="Name" name="name"></v-text-field>
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
.container {
  background-color: #F4F4F6;
  padding: 1em;
  border-radius: 36px;
}
</style>
