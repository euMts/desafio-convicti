<script setup lang="ts">
import BaseLoadingSpinner from "../BaseLoadingSpinner.vue";
import BaseTypography from "../BaseTypography.vue";

interface StatsCardProps {
  title: string;
  value: string | number | undefined;
  subValue?: number;
  iconUrl: string;
  androidCount: number | undefined;
  iosCount: number | undefined;
  subCountValue?: string;
  subCountGood?: boolean;
}

const props = defineProps<StatsCardProps>();
</script>

<template>
  <div
    :class="[
      'flex flex-col w-full bg-white rounded-md px-6 py-3',
      props.title === 'Downloads' ?'max-w-full lg:max-w-[264px]': 'max-w-full',
    ]"
  >
    <div class="flex justify-between items-center">
      <BaseTypography as="h2" size="heading-md" weight="semibold" class="opacity-45">{{
        props.title
      }}</BaseTypography>
      <img :src="props.iconUrl" />
    </div>
    <BaseLoadingSpinner v-if="!props.value" class="w-6 py-4" />
    <BaseTypography v-if="props.value" as="h1" size="display" weight="bold"
      >{{ props.value
      }}<BaseTypography v-if="props.subValue" as="span" size="body-lg" weight="medium"
        >/{{ props.subValue }}</BaseTypography
      >
    </BaseTypography>
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start gap-6">
        <div class="flex justify-start items-center gap-1">
          <img src="/svg/android.svg" />
          <BaseLoadingSpinner v-if="!props.androidCount" class="w-3" />
          <BaseTypography v-if="props.androidCount" as="h2" size="body-lg" weight="normal">{{
            props.androidCount
          }}</BaseTypography>
        </div>
        <div class="flex justify-start items-center gap-1">
          <img src="/svg/apple.svg" />
          <BaseLoadingSpinner v-if="!props.iosCount" class="w-3" />
          <BaseTypography v-if="props.iosCount" as="h2" size="body-lg" weight="normal">{{
            props.iosCount
          }}</BaseTypography>
        </div>
      </div>
      <div v-if="props.subCountValue" class="flex items-center justify-center gap-1">
        <BaseTypography
          as="span"
          size="body-lg"
          weight="semibold"
          :color="props.subCountGood ? 'success' : 'error'"
          >{{ props.subCountValue }}</BaseTypography
        >
        <img
          :src="props.subCountGood ? '/svg/arrow-down-good.svg' : '/svg/arrow-down-bad.svg'"
          :class="['size-3', !props.subCountGood && 'rotate-180']"
        />
      </div>
    </div>
  </div>
</template>
