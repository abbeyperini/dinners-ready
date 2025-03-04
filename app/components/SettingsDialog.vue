<script setup lang="ts">
defineProps({
  actionButtonText: {
    type: String,
    default: "Add",
  },
})
</script>
<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{props: activatorProps}">
      <v-btn v-bind="activatorProps">Settings</v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-actions>
          <v-btn
            rounded="lg" 
            variant="elevated"
            :text="actionButtonText"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            text="Close Dialog"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>