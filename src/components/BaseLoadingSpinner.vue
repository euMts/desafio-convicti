<script setup lang="ts">

interface BaseLoadingSpinnerProps {
  class?: string;
}

const props = defineProps<BaseLoadingSpinnerProps>();
</script>

<template>
  <img src="/svg/spinner.svg" :class="['opacity-40', props.class]" />
</template>
