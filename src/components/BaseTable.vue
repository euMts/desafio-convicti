<script setup lang="ts">
import BaseTypography from "./BaseTypography.vue";
import { trimText } from "@/utils/textUtils";

interface TableProps {
  columns: { key: string; label: string }[];
  data: Record<string, string | number>[];
}

const props = defineProps<TableProps>();
</script>

<template>
  <div class="bg-white overflow-hidden">
    <div class="w-full overflow-x-auto">
      <table class="w-full border-collapse min-w-[600px]">
        <thead>
          <tr>
            <th
              v-for="column in props.columns"
              :key="column.key"
              class="py-3 text-left text-black/40 whitespace-nowrap"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, rowIndex) in props.data"
            :key="rowIndex"
            :class="['hover:bg-gray-50 transition', rowIndex % 2 === 0 && 'bg-[#F6F6F6]']"
          >
            <td
              v-for="(column, colIndex) in props.columns"
              :key="column.key"
              class="px-2 py-3 text-gray-700 items-center justify-center align-top whitespace-nowrap"
            >
              <BaseTypography
                :color="colIndex === props.columns.length - 1 && column.label === 'Taxa De Uso' ? 'success' : 'secondary'"
                size="body-md"
                :weight="colIndex === props.columns.length - 1 && column.label === 'Taxa De Uso' ? 'bold' : 'medium'"
                class="text-wrap"
              >
                {{ trimText(row[column.key].toString(), 120) || "-" }}
              </BaseTypography>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
