<script setup lang="ts">
import BaseTypography from "./BaseTypography.vue";

interface LoadingLogoProps {
  message: string;
}

const props = defineProps<LoadingLogoProps>();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <img src="/img/logo.png" alt="Logo do sistema" class="w-24 h-auto object-contain aspect-auto animate-bounce" />
    <BaseTypography as="p" weight="semibold" size="heading-md" class="opacity-80">{{
      props.message
    }}</BaseTypography>
  </div>
</template>
