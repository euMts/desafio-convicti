<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { getUserData } from "@/services/user";
import type { UserData } from "@/types/User";
import LoadingLogo from "@/components/LoadingLogo.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import DashboardPage from "@/components/DashboardPage/DashboardPage.vue";
import BaseTypography from "@/components/BaseTypography.vue";
import ConfigPage from "@/components/ConfigPage/ConfigPage.vue";
import { checkIfUserIsAdmin } from "@/utils/userUtils";

const authStore = useAuthStore();
const router = useRouter();

const userData = ref<UserData | null>(null);

const errorMessage = ref("");
const isLoading = ref(true);
const userIsAdmin = ref<boolean>(false);

const token = computed(() => authStore.token);

const isDev = import.meta.env.VITE_ENV === "dev";

const handleGetUserData = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  if (!token.value) {
    logout();
    return;
  }

  try {
    const { status, data } = await getUserData(token.value!);

    if (status !== 200) {
      logout();
      return;
    }

    userData.value = data;
    userIsAdmin.value = checkIfUserIsAdmin(userData.value.profile);
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error);
    logout();
  } finally {
    if (isDev) {
      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    } else {
      isLoading.value = false;
    }
  }
};

onMounted(() => {
  handleGetUserData();
});

const logout = () => {
  router.push("/logout");
};

const currentPage = ref<"dashboard" | "config">("dashboard");

const setCurrentPage = (page: "dashboard" | "config") => {
  currentPage.value = page;
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-background">
    <LoadingLogo v-if="isLoading" message="Carregando..." />
    <!-- only the admin can see settings page -->
    <SideBar
      v-if="!isLoading"
      :currentPage="currentPage"
      :configButtonActive="userIsAdmin"
      @update:currentPage="setCurrentPage"
    />
    <div
      v-if="!isLoading && userData"
      id="content"
      class="flex flex-col w-full h-screen ml-0 lg:ml-[250px] mt-14 lg:mt-10 bg-background px-10 lg:px-14 py-12"
    >
      <BaseTypography as="h1" color="primary" size="heading-xl" weight="bold" class="mb-5">{{
        currentPage === "dashboard" ? "Estatísticas" : "Configurações"
      }}</BaseTypography>
      <DashboardPage
        v-if="currentPage === 'dashboard'"
        :token="token!"
        :permissions="userData!.profile.permissions"
        :isActive="currentPage === 'dashboard'"
      />
      <ConfigPage
        v-if="currentPage === 'config'"
        :token="token!"
      />
    </div>
  </div>
</template>
