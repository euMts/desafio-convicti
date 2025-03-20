<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import LoadingLogo from "@/components/LoadingLogo.vue";
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  authStore.logout();
  router.push("/login");
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-background">
    <LoadingLogo message="Saindo..." />
  </div>
</template>
