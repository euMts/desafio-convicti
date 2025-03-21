<script setup lang="ts">
import type { FormatedProfiles } from "@/types/Profile";
import { onMounted, ref } from "vue";
import BaseTypography from "../BaseTypography.vue";
import BaseLoadingSpinner from "../BaseLoadingSpinner.vue";

import ConfigTable from "./ConfigTable.vue";
import { getProfilesData, simplifyProfile } from "@/services/profiles";
import type { FormatedUser } from "@/types/User";
import { getAllUsersData } from "@/services/user";
import BaseDialog from "../BaseDialog.vue";
import NewProfileDialogContent from "./NewProfileDialog/NewProfileDialogContent.vue";
import NewUserDialogContent from "./NewUserDialog/NewUserDialogContent.vue";

interface DashboardProps {
  configButtonActive?: boolean;
  token: string;
}

const props = defineProps<DashboardProps>();
const isNewProfileDialogOpen = ref(false);
const isNewUserDialogOpen = ref(false);

const profilesTableColumns = [
  { key: "name", label: "Nome" },
  { key: "total_users", label: "Quantidade de Usuarios" },
  { key: "permissions", label: "Permissões" },
];

const usersTableColumns = [
  { key: "name", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "profileName", label: "Perfil" },
  { key: "active", label: "Status" },
];

const profiles = ref<FormatedProfiles[] | null>(null);
const users = ref<FormatedUser[] | null>(null);
const profilesDataIsLoading = ref(false);
const usersDataIsLoading = ref(false);

const fetchProfilesData = async () => {
  profilesDataIsLoading.value = true;
  try {
    profiles.value = (await getProfilesData(props.token)).profiles;
  } catch (error) {
    console.error("Erro ao carregar dados dos perfis:", error);
  } finally {
    profilesDataIsLoading.value = false;
  }
};
const fetchUsersData = async () => {
  usersDataIsLoading.value = true;
  try {
    users.value = (await getAllUsersData(props.token)).data;
  } catch (error) {
    console.error("Erro ao carregar dados dos usuarios:", error);
  } finally {
    usersDataIsLoading.value = false;
  }
};

onMounted(() => {
  fetchProfilesData();
  fetchUsersData();
});
</script>

<template>
  <div class="flex flex-col w-full gap-5">
    <div :class="['p-6 bg-white rounded-lg shadow-md']">
      <div class="flex w-full justify-between">
        <BaseTypography size="heading-md" weight="semibold">Perfis</BaseTypography>
        <button
          v-if="profiles && !profilesDataIsLoading"
          @click="isNewProfileDialogOpen = true"
          class="hover:opacity-80 cursor-pointer transition-all duration-200 pr-1"
        >
          <img src="/svg/square-plus.svg" class="size-8" />
        </button>
      </div>
      <BaseDialog
        :isOpen="isNewProfileDialogOpen"
        @close="isNewProfileDialogOpen = false"
        title="Novo perfil"
      >
        <template #default="{ closeDialogEvent }">
          <NewProfileDialogContent
            :closeDialogEvent="closeDialogEvent"
            :token="token"
            :fetchProfilesData="fetchProfilesData"
          />
        </template>
      </BaseDialog>
      <div v-if="!profiles || profilesDataIsLoading" class="flex gap-1">
        <BaseLoadingSpinner class="w-4" />
        <BaseTypography size="body-lg" weight="semibold" class="opacity-65"
          >Carregando...</BaseTypography
        >
      </div>
      <ConfigTable
        v-if="profiles && !profilesDataIsLoading"
        :columns="profilesTableColumns"
        :data="profiles || []"
      />
    </div>

    <div :class="['p-6 bg-white rounded-lg shadow-md mb-16']">
      <div class="flex w-full justify-between">
        <BaseTypography size="heading-md" weight="semibold">Usuários</BaseTypography>
        <button
          v-if="users && !usersDataIsLoading"
          @click="isNewUserDialogOpen = true"
          class="hover:opacity-80 cursor-pointer transition-all duration-200 pr-1"
        >
          <img src="/svg/square-plus.svg" class="size-8" />
        </button>
      </div>
      <BaseDialog
        :isOpen="isNewUserDialogOpen"
        @close="isNewUserDialogOpen = false"
        title="Novo Usuário"
      >
        <template #default="{ closeDialogEvent }">
          <NewUserDialogContent
            :closeDialogEvent="closeDialogEvent"
            :token="token"
            :fetchProfilesData="fetchProfilesData"
            :fetchUsersData="fetchUsersData"
            :selectOptions="simplifyProfile(profiles!)"
          />
        </template>
      </BaseDialog>
      <div v-if="!users || usersDataIsLoading" class="flex gap-1">
        <BaseLoadingSpinner class="w-4" />
        <BaseTypography size="body-lg" weight="semibold" class="opacity-65"
          >Carregando...</BaseTypography
        >
      </div>
      <ConfigTable
        v-if="users && !usersDataIsLoading"
        :columns="usersTableColumns"
        :data="users || []"
      />
    </div>
  </div>
</template>
