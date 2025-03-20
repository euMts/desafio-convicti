<script setup lang="ts">
import BaseTypography from "@/components/BaseTypography.vue";

interface ProfileTableItemProps {
  names: string[];
}

const props = defineProps<ProfileTableItemProps>();
</script>

<template>
  <div class="flex gap-2 w-fit flex-wrap">
    <div
      v-for="(name, index) in props.names"
      :key="index"
      class="flex bg-[#5B59FF]/20 w-fit px-4 py-2 rounded-full"
    >
      <BaseTypography color="primary" size="body-md" weight="medium">{{ name }}</BaseTypography>
    </div>
  </div>
</template>
