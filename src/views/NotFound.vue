<template>
  <div class="flex flex-col items-center justify-center h-screen text-center bg-background gap-2">
    <h1 class="text-4xl font-bold text-gray-800">404 - Página Não Encontrada</h1>
    <p class="text-gray-600">A página que você está procurando não existe.</p>
    <router-link
      to="/"
      class="w-fit px-4 bg-my-purple hover:bg-my-purple/90 text-white font-bold py-3 rounded-lg transition cursor-pointer mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Voltar para Home
    </router-link>
  </div>
</template>
