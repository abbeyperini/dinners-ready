<script setup lang="ts">
const triggers = useFetch("https://3623f49c-e155-49ab-bd37-fbe4b64a4b21.mock.pstmn.io/api/webhook");
</script>

<template>
  <h1>Incoming Sources</h1>
  <ul>
    <!--Use data iterator, same on other pages-->
    <li v-for="source in triggers.data">
      <div><h2>{{source.name}}</h2><v-btn>Settings</v-btn></div>
      <ul>
        <li v-for="link in source.links">{{link.name}}</li>
      </ul>
      <v-form>
        <h3>Link Outgoing Source</h3>
        <v-select label="Source" :items="source.links"></v-select>
        <v-btn>Link</v-btn>
      </v-form>
    </li>
  </ul>
  <v-form>
    <h2>Add Incoming Source</h2>
    <v-text-field label="Name"></v-text-field>
    <v-btn>Add</v-btn>
  </v-form>
</template>

<style scoped>

</style>
