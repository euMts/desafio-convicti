<script setup lang="ts">
import { ref } from "vue";
import BaseTypography from "../BaseTypography.vue";
import SideBarButton from "./SideBarButton.vue";

interface SideBarProps {
  currentPage: "dashboard" | "config";
  configButtonActive: boolean;
}

const props = defineProps<SideBarProps>();
const emit = defineEmits(["update:currentPage"]);
const isNavMenuOpen = ref(false);

const handleNavigate = (pageName: "dashboard" | "config") => {
  if (pageName === "dashboard") {
    emit("update:currentPage", "dashboard");
  }
  if (pageName === "config") {
    emit("update:currentPage", "config");
  }
  isNavMenuOpen.value = false;
};
</script>

<template>
  <nav
    class="fixed lg:hidden flex px-10 items-center justify-between top-0 left-0 w-full h-[80px] bg-white border-b border-gray-300 z-50"
  >
    <img
      @click="handleNavigate('dashboard')"
      src="/img/logo.png"
      alt="Logo do sistema"
      class="w-14 h-auto object-contain aspect-auto"
    />
    <img
      v-if="!isNavMenuOpen"
      @click="isNavMenuOpen = !isNavMenuOpen"
      src="/svg/bars.svg"
      alt="Abrir menu"
      class="w-10 h-auto object-contain aspect-auto"
    />
    <img
      v-if="isNavMenuOpen"
      @click="isNavMenuOpen = !isNavMenuOpen"
      src="/svg/close.svg"
      alt="Fechar menu"
      class="w-11 h-auto object-contain aspect-auto"
    />
  </nav>
  <div
    :class="[
      'fixed flex w-full pt-24 lg:pt-10 lg:w-[250px] flex-col items-center py-10 border-r border-gray-200 bg-white left-0 top-0 h-screen px-9 z-10',
      { 'hidden lg:flex': !isNavMenuOpen },
    ]"
  >
    <div id="nav-header" class="flex flex-col gap-7 items-center justify-center mb-5">
      <img
        @click="handleNavigate('dashboard')"
        src="/img/logo.png"
        alt="Logo do sistema"
        class="w-24 min-h-[60px] h-auto object-contain aspect-auto cursor-pointer"
      />
      <BaseTypography as="p" weight="bold" size="body-lg" color="purple"
        >PAINEL DE DADOS</BaseTypography
      >
    </div>

    <div id="nav-center" class="flex flex-col h-full gap-3 w-full">
      <SideBarButton
        icon-url="/svg/dashboard.svg"
        icon-alt="Quadrados organizados em formato de cubo"
        text="Dashboard"
        :isSelected="props.currentPage === 'dashboard'"
        @click="handleNavigate('dashboard')"
      />
    </div>

    <div id="nav-footer" class="flex flex-col w-full gap-2">
      <SideBarButton
        v-if="configButtonActive"
        icon-url="/svg/settings.svg"
        icon-alt="Engrenagem"
        text="Configurações"
        :isSelected="props.currentPage === 'config'"
        @click="handleNavigate('config')"
      />
      <SideBarButton
        as="a"
        href="/logout"
        icon-url="/svg/sign-out.svg"
        icon-alt="Retângulo com seta apontando para a direita"
        text="Sair"
        :isSelected="false"
      />
    </div>
  </div>
</template>
