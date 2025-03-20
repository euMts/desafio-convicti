<script setup lang="ts">
import BaseTypography from "@/components/BaseTypography.vue";

interface ProfileTableItemProps {
  active: boolean;
}

const props = defineProps<ProfileTableItemProps>();
</script>

<template>
  <div class="flex gap-2 w-full">
    <div
      :class="[
        'flex w-full items-center justify-center px-1 py-1 rounded-md',
        props.active ? 'bg-green-200' : 'bg-red-200',
      ]"
    >
      <BaseTypography :color="props.active ? 'green' : 'error'" size="body-md" weight="medium">{{
        props.active ? "ATIVO" : "INATIVO"
      }}</BaseTypography>
    </div>
  </div>
</template>
