<script setup lang="ts">
import BaseTypography from "@/components/BaseTypography.vue";

interface NewProfileItemProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
  isDisabled: boolean;
}

const props = defineProps<NewProfileItemProps>();
</script>

<template>
  <div class="flex items-center justify-between w-full gap-2">
    <BaseTypography size="heading-md" color="primary">{{ props.name }}</BaseTypography>
    <button
      :disabled="isDisabled"
      @click="props.onClick"
      class="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
    >
      <img src="/svg/toggle.svg" :class="['size-8', !isSelected && 'rotate-180']" />
    </button>
  </div>
</template>
