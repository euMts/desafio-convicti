<script setup lang="ts">
import BaseTypography from "@/components/BaseTypography.vue";
import type { SimpleProfileData } from "@/types/Profile";
import { defineProps } from "vue";

interface NewUserItemProps {
  selectOptions: SimpleProfileData[];
  selectedOption: SimpleProfileData | null;
}

const props = defineProps<NewUserItemProps>();
const emit = defineEmits(["update:selectedOption"]);

const handleSelection = (option: SimpleProfileData) => {
  emit("update:selectedOption", option);
};
</script>

<template>
  <div v-for="option in props.selectOptions" :key="option.id" class="flex items-center justify-between gap-2">
    <BaseTypography
      :for="option.name"
      class="cursor-pointer"
      size="heading-md"
      color="primary"
      as="label"
      >{{ option.name }}</BaseTypography
    >

    <input
      type="radio"
      :id="option.name"
      :value="option.name"
      :checked="option.name === props.selectedOption?.name"
      @change="handleSelection(option)"
      class="custom-radio"
    />
  </div>
</template>