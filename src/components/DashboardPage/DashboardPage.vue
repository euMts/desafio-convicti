<script setup lang="ts">
import type { Permission } from "@/types/Profile";
import { computed, onMounted, ref, onUnmounted } from "vue";
import StatsCard from "./StatsCard.vue";
import BaseTypography from "../BaseTypography.vue";
import type { EvaluationCount, FirstEvaluationResponse } from "@/types/Evaluation";
import { getEvaluationsCountByPlatform, getFirstEvaluationsData } from "@/services/evaluations";
import type { DownloadCount, FirstDownloadResponse } from "@/types/Download";
import { getDownloadsCountByPlatform, getFirstDownloadsData } from "@/services/downloads";
import type { ErrorCount, FirstErrorResponse } from "@/types/Error";
import { getErrorssCountByPlatform, getFirstErrorsData } from "@/services/errors";
import BaseLoadingSpinner from "../BaseLoadingSpinner.vue";
import type { FirstNewFeatureResponse } from "@/types/NewFeature";
import { getFirstNewFeaturesData } from "@/services/newFeatures";
import BaseTable from "../BaseTable.vue";
import axios from "axios";

interface DashboardProps {
  permissions: Permission[];
  configButtonActive?: boolean;
  token: string;
  isActive: boolean;
}

const props = defineProps<DashboardProps>();

const hasPermission = (id: number) => props.permissions.some((permission) => permission.id === id);

const userCanSeeDownloads = computed(() => hasPermission(1));
const userCanSeeEvaluations = computed(() => hasPermission(2));
const userCanSeeErrors = computed(() => hasPermission(3));
const userCanSeeFeedbacks = computed(() => hasPermission(4));
const userCanSeeNewFeatures = computed(() => hasPermission(5));

const evaluationTableColumns = [
  { key: "description", label: "Avaliação" },
  { key: "created_at", label: "Data" },
  { key: "evaluation", label: "Avaliação" },
  { key: "improvements", label: "Melhorias" },
  { key: "platform", label: "Plataforma" },
];

const newFeaturesTableColumns = [
  { key: "name", label: "Funcionalidade" },
  { key: "usage_percentage", label: "Taxa De Uso" },
];

let abortController: AbortController | null = null;

const firstEvaluations = ref<FirstEvaluationResponse | null>(null);
const evaluationsCount = ref<EvaluationCount | null>(null);
const firstDownloads = ref<FirstDownloadResponse | null>(null);
const downloadsCount = ref<DownloadCount | null>(null);
const firstErrors = ref<FirstErrorResponse | null>(null);
const errorsCount = ref<ErrorCount | null>(null);
const firstNewFeatures = ref<FirstNewFeatureResponse | null>(null);

const fetchEvaluationsData = async (signal: AbortSignal) => {
  if (!props.isActive) return;
  try {
    firstEvaluations.value = await getFirstEvaluationsData(props.token, signal) as FirstEvaluationResponse;
    evaluationsCount.value = await getEvaluationsCountByPlatform(props.token, signal) as EvaluationCount;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Requisição de avaliações cancelada.");
    } else {
      console.error("Erro ao carregar dados das avaliações:", error);
    }
  }
};

const fetchDownloadsData = async (signal: AbortSignal) => {
  if (!props.isActive) return;
  try {
    firstDownloads.value = (await getFirstDownloadsData(
      props.token,
      signal
    )) as FirstDownloadResponse;
    downloadsCount.value = (await getDownloadsCountByPlatform(
      props.token,
      signal
    )) as DownloadCount;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Requisição de downloads cancelada.");
    } else {
      console.error("Erro ao carregar dados dos downloads:", error);
    }
  }
};

const fetchErrorsData = async (signal: AbortSignal) => {
  if (!props.isActive) return;
  try {
    firstErrors.value = await getFirstErrorsData(props.token, signal) as FirstErrorResponse;
    errorsCount.value = await getErrorssCountByPlatform(props.token, signal) as ErrorCount;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Requisição de erros cancelada.");
    } else {
      console.error("Erro ao carregar dados dos erros:", error);
    }
  }
};

const fetchNewFeaturesData = async (signal: AbortSignal) => {
  if (!props.isActive) return;
  try {
    firstNewFeatures.value = await getFirstNewFeaturesData(props.token, signal) as FirstNewFeatureResponse;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Requisição de novas funcionalidades cancelada.");
    } else {
      console.error("Erro ao carregar dados das novas funcionalidades:", error);
    }
  }
};

const fetchData = () => {
  if (!props.isActive) return;

  abortController?.abort(); // cancel previous requests before creating a new
  abortController = new AbortController();
  const signal = abortController.signal;

  if (userCanSeeDownloads.value) fetchDownloadsData(signal);
  if (userCanSeeEvaluations.value || userCanSeeFeedbacks.value) fetchEvaluationsData(signal);
  if (userCanSeeErrors.value) fetchErrorsData(signal);
  if (userCanSeeNewFeatures.value) fetchNewFeaturesData(signal);
};

onMounted(fetchData);

onUnmounted(() => {
  abortController?.abort();
});
</script>

<template>
  <div class="flex flex-col w-full gap-5">
    <div class="flex w-full justify-between gap-5">
      <StatsCard
        v-if="userCanSeeDownloads"
        title="Downloads"
        :value="firstDownloads?.total"
        iconUrl="svg/cloud-download.svg"
        :androidCount="downloadsCount?.totalAndroid"
        :iosCount="downloadsCount?.totalIos"
      />
      <StatsCard
        v-if="userCanSeeFeedbacks || userCanSeeEvaluations"
        title="Avaliações"
        :value="evaluationsCount?.average"
        :subValue="5"
        iconUrl="svg/star-comment.svg"
        :androidCount="evaluationsCount?.totalAndroid"
        :iosCount="evaluationsCount?.totalIos"
      />
      <StatsCard
        v-if="userCanSeeErrors"
        title="Erros"
        :value="firstErrors?.total"
        iconUrl="svg/times-hexagon.svg"
        :androidCount="errorsCount?.totalAndroid"
        :iosCount="errorsCount?.totalIos"
        :subCountValue="'-5%'"
        :subCountGood="true"
      />
    </div>
    <div
      v-if="userCanSeeEvaluations || userCanSeeFeedbacks"
      :class="['p-6 bg-white rounded-lg shadow-md', !userCanSeeNewFeatures && 'mb-16']"
    >
      <BaseTypography size="heading-md" weight="semibold">Feedbacks</BaseTypography>
      <div v-if="!firstEvaluations" class="flex gap-1">
        <BaseLoadingSpinner class="w-4" />
        <BaseTypography size="body-lg" weight="semibold" class="opacity-65"
          >Carregando...</BaseTypography
        >
      </div>
      <BaseTable
        v-if="firstEvaluations"
        :columns="evaluationTableColumns"
        :data="firstEvaluations!.evaluations || []"
      />
    </div>
    <div v-if="userCanSeeNewFeatures" class="p-6 bg-white rounded-lg shadow-md mb-16">
      <BaseTypography size="heading-md" weight="semibold">Novas Funcionalidades</BaseTypography>
      <div v-if="!firstNewFeatures" class="flex gap-1">
        <BaseLoadingSpinner class="w-4" />
        <BaseTypography size="body-lg" weight="semibold" class="opacity-65"
          >Carregando...</BaseTypography
        >
      </div>
      <BaseTable
        v-if="firstNewFeatures"
        :columns="newFeaturesTableColumns"
        :data="firstNewFeatures!.newFeatures || []"
      />
    </div>
  </div>
</template>
