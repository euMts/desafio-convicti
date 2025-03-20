<script setup lang="ts">
import { computed } from "vue";

interface TypographyProps {
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div" | "label";
  size?:
    | "display"
    | "heading-xl"
    | "heading-lg"
    | "heading-md"
    | "body-lg"
    | "body-md"
    | "body-sm"
    | "caption";
  weight?: "bold" | "semibold" | "medium" | "normal" | "light";
  color?: "primary" | "secondary" | "purple" | "blue" | "error" | "success" | "green" | "warning";
  class?: string;
}

const props = defineProps<TypographyProps>();

const sizeClasses = computed(
  () =>
    ({
      display: "text-[40px]",
      "heading-xl": "text-[32px]",
      "heading-lg": "text-[24px]",
      "heading-md": "text-[20px]",
      "body-lg": "text-[16px]",
      "body-md": "text-[14px]",
      "body-sm": "text-[12px]",
      caption: "text-[10px]",
    }[props.size || "body-md"])
);

const weightClasses = computed(
  () =>
    ({
      bold: "font-bold",
      semibold: "font-semibold",
      medium: "font-medium",
      normal: "font-normal",
      light: "font-light",
    }[props.weight || "normal"])
);

const colorClasses = computed(
  () =>
    ({
      primary: "text-black",
      secondary: "text-[#303030]",
      purple: "text-[#272964]",
      blue: "text-[#2F4565]",
      error: "text-red-500",
      success: "text-[#00EC6D]",
      green: "text-[#006737]",
      warning: "text-yellow-500",
    }[props.color || "primary"])
);
</script>

<template>
  <component :is="as || 'p'" :class="[sizeClasses, weightClasses, colorClasses, props.class]">
    <slot />
  </component>
</template>
