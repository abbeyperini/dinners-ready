<script setup lang="ts">

</script>

<template>
  <v-layout class="rounded rounded-md background">
    <v-app-bar title="Dinner's Ready"></v-app-bar>

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item><NuxtLink to="/">Incoming Sources</NuxtLink></v-list-item>
        <v-list-item><NuxtLink to="/outgoing">Outgoing Sources</NuxtLink></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grid" style="min-height: 300px;">
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
}
</style>
