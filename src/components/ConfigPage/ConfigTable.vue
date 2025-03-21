<script setup lang="ts">
import BaseTypography from "@/components/BaseTypography.vue";
import type { FormatedProfiles, Permission, SimpleProfileData } from "@/types/Profile";
import ProfileTableItem from "./ProfileTableItem.vue";
import UserTableItem from "./UserTableItem.vue";
import { ref } from "vue";
import BaseDialog from "../BaseDialog.vue";
import type { FormatedUser } from "@/types/User";
import UserDialogContent from "./UserDialog/UserDialogContent.vue";
import ProfileDialogContent from "./NewProfileDialog/ProfileDialogContent.vue";

interface ConfigTableProps {
  columns: { key: string; label: string }[];
  data: Record<string, string | number | boolean | { id: number; name: string }[]>[];
  tableType: "profiles" | "users";
  token: string;
  fetchProfilesData: () => Promise<void>;
  fetchUsersData?: () => Promise<void>;
  selectOptions?: SimpleProfileData[];
}

const props = defineProps<ConfigTableProps>();
const isEditProfileDialogOpen = ref(false);
const isEditUserDialogOpen = ref(false);
const currentEditingUser = ref<FormatedUser | null>(null);
const currentEditingProfile = ref<FormatedProfiles | null>(null);

const formatPermission = (permissions: Permission[]): string[] => {
  if (permissions.length === 0) {
    return ["Nenhuma"];
  }

  const fullRequiredIds = new Set([1, 2, 3, 4, 5]);
  const permissionIds = new Set(permissions.map((p) => p.id));

  if ([...fullRequiredIds].every((id) => permissionIds.has(id))) {
    return ["Tudo"];
  }

  return permissions.map((item) => item.name);
};

const handleOpenEditDialog = (
  data: FormatedUser | unknown
) => {
  if(props.tableType === "users"){
    currentEditingUser.value = data as FormatedUser;
    isEditUserDialogOpen.value = true;
  }
  if(props.tableType === "profiles"){
    currentEditingProfile.value = data as FormatedProfiles;
    isEditProfileDialogOpen.value = true;
  }
};
</script>

<template>
  <BaseDialog
    :isOpen="isEditUserDialogOpen"
    @close="isEditUserDialogOpen = false"
    title="Editar Usuário"
  >
    <template #default="{ closeDialogEvent }">
      <UserDialogContent
        :closeDialogEvent="closeDialogEvent"
        :selectOptions="props.selectOptions"
        :currentEditingUser="currentEditingUser!"
        type="edit"
      />
    </template>
  </BaseDialog>
  <BaseDialog
    :isOpen="isEditProfileDialogOpen"
    @close="isEditProfileDialogOpen = false"
    title="Editar Perfil"
  >
    <template #default="{ closeDialogEvent }">
      <ProfileDialogContent
        :closeDialogEvent="closeDialogEvent"
        :currentEditingProfile="currentEditingProfile!"
        type="edit"
      />
    </template>
  </BaseDialog>
  <div class="bg-white overflow-hidden">
    <table class="w-full border-collapse mt-2">
      <thead>
        <tr class="border-t border-gray-300">
          <th
            v-for="column in props.columns"
            :key="column.key"
            class="py-3 text-left text-black/40"
          >
            {{ column.label }}
          </th>
          <th class="py-3" />
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, rowIndex) in props.data"
          :key="rowIndex"
          :class="['hover:bg-gray-50 transition', rowIndex % 2 === 0 && 'bg-[#F6F6F6]']"
        >
          <td
            v-for="column in props.columns"
            :key="column.key"
            class="px-2 py-3 text-gray-700 max-w-[400px] items-center justify-center align-top"
          >
            <template v-if="Array.isArray(row[column.key]) && column.label === 'Permissões'">
              <ProfileTableItem :names="formatPermission(row[column.key] as Permission[])" />
            </template>
            <template v-if="column.label === 'Status'">
              <UserTableItem :active="row[column.key] as boolean" />
            </template>
            <BaseTypography
              v-if="
                !Array.isArray(row[column.key]) &&
                column.label !== 'Permissões' &&
                column.label !== 'Status'
              "
              color="secondary"
              size="body-md"
              weight="medium"
            >
              {{ row[column.key] }}
            </BaseTypography>
          </td>
          <td class="py-3 bg-white text-right">
            <button
              @click="handleOpenEditDialog(row as unknown)"
              class="hover:scale-110 transform cursor-pointer ml-auto mr-2.5 transition-all duration-200"
            >
              <img src="/svg/edit.svg" class="size-5 min-w-5" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
