<script setup lang="ts">
import BaseTypography from "../BaseTypography.vue";
import SideBarButton from "./SideBarButton.vue";

interface SideBarProps {
  currentPage: "dashboard" | "config";
  configButtonActive: boolean;
}

const props = defineProps<SideBarProps>();
const emit = defineEmits(["update:currentPage"]);
</script>

<template>
  <div
    class="fixed flex flex-col items-center py-10 border-r border-gray-200 bg-white left-0 top-0 h-screen w-[250px] px-9 z-10"
  >
    <div id="nav-header" class="flex flex-col gap-7 items-center justify-center mb-5">
      <img
        src="/img/logo.png"
        alt="Logo do sistema"
        class="w-24 min-h-[60px] h-auto object-contain aspect-auto"
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
        @click="emit('update:currentPage', 'dashboard')"
      />
    </div>

    <div id="nav-footer" class="flex flex-col w-full gap-2">
      <SideBarButton
        v-if="configButtonActive"
        icon-url="/svg/settings.svg"
        icon-alt="Engrenagem"
        text="Configurações"
        :isSelected="props.currentPage === 'config'"
        @click="emit('update:currentPage', 'config')"
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
