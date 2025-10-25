<template>
  <div
    class="background-main min-h-screen bg-[#1a1a1] flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 mb-4">
          <div>
            <img
              src="../assets/images/Logo 128.png"
              class="img-logo w-24 rounded-full"
              alt=""
            />
          </div>
          <router-link
            to="/"
            class="text-xl hover:text-secondary-orange transition duration-150 font-semibold text-white"
            >Lume</router-link
          >
        </div>

        <h1 class="text-2xl font-bold text-white mb-2">Criar sua conta</h1>
        <p class="text-slate-400">Preencha os dados para se cadastrar</p>
      </div>

      <div
        class="rounded-2xl p-8 shadow-xl bg-black-100 backdrop-blur-sm border-border-100"
      >
        <form @submit.prevent="handlePost" class="space-y-6">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Nome Completo
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Senha
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
              >
                <svg
                  v-if="showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-primary-orange hover:bg-secondary-orange cursor-pointer disabled:bg-orange-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Criando conta...
            </span>
            <span v-else>Criar Conta</span>
          </button>

          <div
            v-if="message"
            :class="messageClass"
            class="p-3 rounded-lg text-sm"
          >
            {{ message }}
          </div>
        </form>

        <div class="mt-6 text-center">
          <p class="text-slate-400">
            Já tem uma conta?
            <router-link
              to="signin"
              class="text-orange-300 hover:text-orange-400 font-medium transition-colors"
            >
              Fazer login
            </router-link>
          </p>
        </div>
      </div>

      <div class="mt-8 text-center text-slate-500 text-sm">
        <p>&copy; 2025 Lume. Todos os direitos reservados.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  user-select: none;
}
</style>

<script lang="ts" setup>
import { ref, computed } from "vue";
import router from "@lib/router-config";
import { invoke } from '@tauri-apps/api/core'

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

async function handlePost() {
  isLoading.value = true;
  message.value = "";

  if(form.value.password !==form.value.confirmPassword) {
    message.value = "As senhas não coincidem";
    isLoading.value = false;
    return
  }


  try {
    const response = await invoke("post_user", {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    });

    console.log("resposta dessa porra: ", response);
  } catch (err) {
    console.error(err);
  }
  finally {
    isLoading.value = false;
  }
}

const showPassword = ref(false);
const isLoading = ref(false);
const message = ref("");
const messageType = ref("");
</script>
