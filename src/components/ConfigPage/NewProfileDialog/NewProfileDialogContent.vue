<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "../../BaseInput.vue";
import BaseTypography from "../../BaseTypography.vue";
import NewProfileItem from "./NewProfileItem.vue";
import type { NewProfileData } from "@/types/Profile";
import { addNewProfile } from "@/services/profiles";
import type { AxiosError } from "axios";

const props = defineProps<{
  closeDialogEvent: () => void;
  token: string;
  fetchProfilesData: () => void;
}>();

const newProfileName = ref("");
const errorMessage = ref("");
const isLoading = ref(false);
const isDownloadsSelected = ref(false);
const isEvaluationsSelected = ref(false);
const isErrorssSelected = ref(false);
const isFeedbacksSelected = ref(false);
const isNewFeaturesSelected = ref(false);

const toggleDownloadsSelected = () => {
  isDownloadsSelected.value = !isDownloadsSelected.value;
};
const toggleEvaluationsSelected = () => {
  isEvaluationsSelected.value = !isEvaluationsSelected.value;
};
const toggleErrorsSelected = () => {
  isErrorssSelected.value = !isErrorssSelected.value;
};
const toggleFeedbacksSelected = () => {
  isFeedbacksSelected.value = !isFeedbacksSelected.value;
};
const toggleNewFeaturesSelected = () => {
  isNewFeaturesSelected.value = !isNewFeaturesSelected.value;
};

const handleCreateProfile = async () => {
  errorMessage.value = "";
  if (newProfileName.value.length <= 0) {
    errorMessage.value = "Preencha o nome.";
  } else {
    const newProfileData = {
      name: newProfileName.value,
      permissions: [],
    } as NewProfileData;

    if (isDownloadsSelected.value) newProfileData.permissions.push(1);
    if (isEvaluationsSelected.value) newProfileData.permissions.push(2);
    if (isErrorssSelected.value) newProfileData.permissions.push(3);
    if (isFeedbacksSelected.value) newProfileData.permissions.push(4);
    if (isNewFeaturesSelected.value) newProfileData.permissions.push(5);

    isLoading.value = true;
    try {
      const response = await addNewProfile(newProfileData, props.token);

      if (response.status !== 201) {
        errorMessage.value = "Algo deu errado.";
        return;
      }

      props.closeDialogEvent();
      props.fetchProfilesData();
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
      v-model="newProfileName"
      id="newProfileName"
      type="text"
      placeholder="Novo Perfil"
      required
    />
    <BaseTypography size="body-md" color="secondary" class="opacity-50">Dashboard</BaseTypography>
    <div class="flex flex-col w-full gap-3">
      <NewProfileItem
        :isDisabled="isLoading"
        :onClick="() => toggleDownloadsSelected()"
        name="Downloads"
        :isSelected="isDownloadsSelected"
      />
      <NewProfileItem
        :isDisabled="isLoading"
        :onClick="() => toggleEvaluationsSelected()"
        name="Avaliações"
        :isSelected="isEvaluationsSelected"
      />
      <NewProfileItem
        :isDisabled="isLoading"
        :onClick="() => toggleErrorsSelected()"
        name="Erros"
        :isSelected="isErrorssSelected"
      />
      <NewProfileItem
        :isDisabled="isLoading"
        :onClick="() => toggleFeedbacksSelected()"
        name="Feedbacks"
        :isSelected="isFeedbacksSelected"
      />
      <NewProfileItem
        :isDisabled="isLoading"
        :onClick="() => toggleNewFeaturesSelected()"
        name="Novas Funcionalidades"
        :isSelected="isNewFeaturesSelected"
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
        @click="handleCreateProfile"
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
