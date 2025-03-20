<script setup lang="ts">
import BaseTypography from "../BaseTypography.vue";

interface SideBarButtonProps {
  text: string;
  iconUrl: string;
  iconAlt: string;
  isSelected: boolean;
  as?: "button" | "a";
  href?: string;
}

const props = defineProps<SideBarButtonProps>();
</script>

<template>
  <component
    :is="props.as || 'button'"
    :href="props.as === 'a' ? props.href : undefined"
    class="flex items-center h-fit justify-start gap-2 w-full rounded-md px-5 py-3 cursor-pointer transition-all duration-300 hover:scale-[101%]"
    :class="[isSelected ? 'bg-[#DEE6F8] hover:bg-[#c2d1f3]' : 'bg-transparent hover:bg-[#DEE6F8] ']"
  >
    <img
      :src="props.iconUrl"
      :alt="props.iconAlt"
      class="w-[18px] h-auto object-contain aspect-auto"
    />

    <BaseTypography as="p" weight="semibold" size="body-lg" color="blue">{{
      props.text
    }}</BaseTypography>
  </component>
</template>
