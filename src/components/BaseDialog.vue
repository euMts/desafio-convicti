<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import BaseTypography from "./BaseTypography.vue";

const props = defineProps<{ isOpen: boolean; title: string }>();
const emit = defineEmits(["close"]);

const closeDialog = () => {
  emit("close");
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeDialog();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="closeDialog"
  >
    <div
      class="flex flex-col bg-background px-7 pt-6 rounded-lg shadow-lg max-w-lg w-full relative"
    >
      <BaseTypography size="heading-md" weight="semibold" class="font-nunito">{{
        props.title
      }}</BaseTypography>
      <div class="flex w-full pt-1 pb-5">
        <slot :closeDialogEvent="closeDialog" />
      </div>
    </div>
  </div>
</template>
