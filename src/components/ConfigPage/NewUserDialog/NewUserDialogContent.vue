<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "../../BaseInput.vue";
import BaseTypography from "../../BaseTypography.vue";
import NewUserItem from "./NewUserItem.vue";
import type { SimpleProfileData } from "@/types/Profile";
import BaseLoadingSpinner from "@/components/BaseLoadingSpinner.vue";
import type { NewUserData } from "@/types/User";
import { addNewUser } from "@/services/user";
import type { AxiosError } from "axios";

const props = defineProps<{
  closeDialogEvent: () => void;
  token: string;
  fetchProfilesData: () => void;
  fetchUsersData: () => void;
  selectOptions: SimpleProfileData[] | null | undefined;
}>();

const newUserName = ref("");
const newUserEmail = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const selectedOption = ref<SimpleProfileData | null>(null);

const handleCreateUser = async () => {
  errorMessage.value = "";
  if (newUserName.value.length <= 0) {
    errorMessage.value = "Preencha o nome.";
  } else if (newUserEmail.value.length <= 0) {
    errorMessage.value = "Preencha o email.";
  } else if (!selectedOption.value) {
    errorMessage.value = "Preencha o perfil.";
  } else {
    const newUserData = {
      name: newUserName.value,
      email: newUserEmail.value,
      profile_id: selectedOption.value.id,
    } as NewUserData;

    isLoading.value = true;
    try {
      const response = await addNewUser(newUserData, props.token);

      if (response.status !== 201) {
        errorMessage.value = "Algo deu errado.";
        return;
      }

      props.closeDialogEvent();
      props.fetchProfilesData();
      props.fetchUsersData();
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        errorMessage.value = "Este email já foi utilizado.";
      } else {
        errorMessage.value = "Algo deu errado.";
      }
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <BaseInput
      :disabled="isLoading"
      v-model="newUserName"
      id="newUserName"
      type="text"
      placeholder="Nome do usuário"
      required
    />
    <BaseInput
      :disabled="isLoading"
      v-model="newUserEmail"
      id="newUserEmail"
      type="email"
      placeholder="Email"
      required
    />
    <BaseTypography size="body-md" color="secondary" class="opacity-50">Perfil</BaseTypography>
    <div class="flex flex-col w-full gap-3">
      <div v-if="!props.selectOptions" class="flex gap-1">
        <BaseLoadingSpinner class="w-4" />
        <BaseTypography size="body-lg" weight="semibold" class="opacity-65"
          >Carregando...</BaseTypography
        >
      </div>
      <NewUserItem
        v-if="props.selectOptions"
        v-model:selectedOption="selectedOption"
        :selectOptions="props.selectOptions"
      />
    </div>
    <div class="flex w-full justify-between gap-3 mt-4">
      <button
        @click="props.closeDialogEvent"
        class="flex w-full bg-[#7C7C7C]/20 rounded-md py-2 cursor-pointer hover:bg-[#7C7C7C]/15 transition-all duration-200 hover:-translate-y-0.5 max-w-[200px]"
      >
        <BaseTypography class="w-full text-[#606060]" size="body-lg" weight="semibold"
          >Voltar</BaseTypography
        >
      </button>
      <button
        :disabled="isLoading"
        @click="handleCreateUser"
        class="flex w-full bg-[#1400FF]/20 rounded-md py-2 cursor-pointer hover:bg-[#1400FF]/15 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
      >
        <BaseTypography class="w-full text-[#7F43FF]" size="body-lg" weight="semibold">{{
          isLoading ? "Aguarde..." : "Adicionar"
        }}</BaseTypography>
      </button>
    </div>
    <BaseTypography size="body-lg" class="text-center" color="error" weight="semibold">{{
      errorMessage
    }}</BaseTypography>
  </div>
</template>
