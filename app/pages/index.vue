<script setup lang="ts">
import { type SavedTrigger, type SavedWebhook } from "../../shared/utils/schemas";
const { data: triggers } = await useFetch<SavedTrigger[]>("https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/trigger");
const { data: webhooks } = await useFetch<SavedWebhook[]>("https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/webhook");
async function handleAddSubmit(data) {
  await useFetch("https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/trigger/add", {method: "post", immediate: false, body: data});
}
async function handleLinkSubmit(triggerId, event) {
  await useFetch(`https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/link/${triggerId}${event}`)
}
</script>

<template>
  <h1>Incoming Sources</h1>
  <ul>
    <!--Use data iterator, same on other pages-->
    <li v-for="source in triggers">
      <div><h2>{{source.name}}</h2><v-btn>Settings</v-btn></div>
      <!-- <ul>
        <li v-for="link in source.links">{{link.name}}</li>
      </ul> -->
      <v-form @submit.prevent="(e) => handleLinkSubmit(source._id, e)">
        <h3>Link Outgoing Source</h3>
        <v-select label="Outgoing" :items="webhooks" item-title="name" item-value="name"></v-select>
        <v-btn rounded="lg" variant="elevated" type="submit">Link</v-btn>
      </v-form>
    </li>
  </ul>
  <v-form @submit.prevent="handleAddSubmit">
    <h2>Add Incoming Source</h2>
    <v-text-field label="Name"></v-text-field>
    <v-btn rounded="lg" variant="elevated" type="submit">Add</v-btn>
    <!--trigger copy secret modal on successful add-->
  </v-form>
</template>

<style scoped>

</style>
