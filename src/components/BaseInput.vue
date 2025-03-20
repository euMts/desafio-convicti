<script setup lang="ts">
import { ref } from "vue";

interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  modelValue: string;
  class?: string;
  minlength?: string
}

const props = defineProps<InputProps>();
const emit = defineEmits(["update:modelValue"]);

const showPassword = ref(false);

const inputType = ref(props.type || "text");

const togglePassword = () => {
  showPassword.value = !showPassword.value;
  inputType.value = showPassword.value ? "text" : "password";
};
</script>

<template>
  <div class="relative w-full">
    <input
      :minlength="minlength"
      :id="id"
      :type="inputType"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="[
        'w-full p-3 border border-black/20 rounded-lg outline-none bg-white',
        disabled && 'bg-gray-100 cursor-not-allowed',
        type === 'password' && 'pr-10',
        props.class,
      ]"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <button
      tabindex="-1"
      v-if="props.type === 'password'"
      type="button"
      @click="togglePassword"
      class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
      aria-label="Alternar visibilidade da senha"
    >
      <img v-if="showPassword" src="/svg/eye.svg" alt="Ocultar senha" class="w-5 h-5" />
      <img v-else src="/svg/eye-off.svg" alt="Mostrar senha" class="w-5 h-5" />
    </button>
  </div>
</template>
