<script setup lang="ts">
import shiba from "~/assets/shiba.png"
const showDrawer = ref(false);
</script>

<template>
  <v-layout class="rounded rounded-md background">
    <v-app-bar><v-app-bar-nav-icon @click.stop="showDrawer = !showDrawer"><img :src="shiba" class="shiba" alt=""/></v-app-bar-nav-icon><v-app-bar-title>Dinner's Ready</v-app-bar-title></v-app-bar>

    <v-navigation-drawer v-model="showDrawer">
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
.shiba {
  height: 40px;
}
</style>
