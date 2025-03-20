<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import BaseTypography from "@/components/BaseTypography.vue";
import BaseInput from "@/components/BaseInput.vue";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  const success = await authStore.login(email.value, password.value);

  if (success) {
    router.push("/");
  } else {
    errorMessage.value = "Usuário ou senha incorretos.";
  }

  isLoading.value = false;
};
</script>

<template>
  <div
    class="flex w-full min-h-screen items-center justify-center sm:justify-between overflow-hidden"
  >
    <div
      class="absolute top-20 sm:top-10 left-0 sm:left-16 flex w-full sm:w-fit items-center justify-center"
    >
      <div class="flex flex-col items-center justify-center w-20 gap-1">
        <img src="/img/logo.png" alt="Logo do sistema" class="w-full h-auto object-contain aspect-auto" />
        <BaseTypography
          as="h1"
          size="heading-md"
          weight="semibold"
          color="primary"
          class="font-nunito"
        >
          CONVIC<span class="text-my-purple">TI</span>
        </BaseTypography>
      </div>
    </div>
    <div
      id="input-form"
      class="flex flex-col w-full max-w-[500px] sm:max-w-[300px] items-center sm:items-start justify-center gap-7 px-10 sm:px-0 z-20 ml-0 sm:ml-[40px] md:ml-[50px] lg:ml-[100px] xl:ml-[200px] text-center sm:text-start"
    >
      <div>
        <BaseTypography as="h1" size="heading-lg" weight="bold" color="primary">
          Bem-vindo de Volta
        </BaseTypography>
        <BaseTypography as="h2" size="body-sm" weight="medium" class="text-black/50">
          Insira suas credenciais para acessar a plataforma
        </BaseTypography>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col w-full space-y-3">
        <BaseInput
          :disabled="isLoading"
          v-model="email"
          id="email"
          type="email"
          placeholder="Seu e-mail"
          required
        />
        <BaseInput
          :disabled="isLoading"
          v-model="password"
          id="password"
          type="password"
          placeholder="Sua senha"
          required
          minlength="3"
        />

        <BaseTypography v-if="errorMessage" as="p" size="body-md" weight="semibold" color="error">
          {{ errorMessage }}
        </BaseTypography>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-my-purple hover:bg-my-purple/90 text-white font-bold py-3 rounded-lg transition cursor-pointer mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? "Aguarde..." : "Entrar" }}
        </button>
      </form>
    </div>
    <div class="relative w-full max-w-2xl hidden sm:flex">
      <div class="absolute inset-0 flex justify-center items-center -z-10">
        <!-- big circle -->
        <div
          class="absolute rounded-full border border-my-purple opacity-50 w-[110vh] h-[110vh]"
        ></div>
        <!-- small circle -->
        <div class="absolute rounded-full border border-my-purple w-[85vh] h-[85vh]"></div>
      </div>

      <img
        src="/img/dashboard.png"
        class="absolute sm:-right-[700px] md:-right-[600px] lg:-right-[400px] xl:-right-[300px] top-1/2 transform -translate-y-1/2 max-w-none z-10"
      />
    </div>
  </div>
</template>
