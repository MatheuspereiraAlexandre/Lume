<template>
  <div
    class="background-main min-h-screen flex items-center justify-center p-8"
  >
    <div class="max-w-md w-full text-center">
      <!-- Logo/Icon Area -->
      <div class="mb-8">
        <div
          class="w-20 h-20 bg-gradient-to-br from-blue-800 to-red-800 rounded-2xl mx-auto flex items-center justify-center mb-4"
        ></div>
        <h1 class="text-3xl font-bold text-white mb-2">Bem-vindo</h1>
        <p class="text-gray-400 text-lg">Seu workspace pessoal</p>
      </div>

      <!-- Welcome Message -->
      <div class="mb-10">
        <h2 class="text-xl text-gray-300 mb-4 leading-relaxed">
          Organize seus projetos, colabore com sua equipe e mantenha tudo
          sincronizado em um só lugar.
        </h2>
        <p class="text-gray-500 text-sm">
          Comece sua jornada de produtividade hoje mesmo.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-4">
        <button
          @click="handleLogin"
          class="btn-login w-full  text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon :icon="['fas', 'right-to-bracket']" class="w-5 h-5" />
          Fazer Login
        </button>

        <button
          @click="handleSignup"
          class="btn-signup w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon :icon="['fas', 'user-plus']" class="w-5 h-5" />
          Criar Conta
        </button>

        <div class="flex items-center justify-center mt-6">
          <div class="border-t border-gray-700 flex-grow"></div>
          <span class="px-4 text-gray-500 text-sm">ou</span>
          <div class="border-t border-gray-700 flex-grow"></div>
        </div>

        <button
          @click="notify"
          class="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-6 rounded-lg transition-colors duration-200 text-sm"
        >
          Continuar sem conta
        </button>
      </div>

      <!-- Footer -->
      <div class="mt-12 text-center">
        <p class="text-gray-600 text-xs">
          Versão 1.0.0 •
          <a
            href="#"
            class="text-blue-400 hover:text-blue-300 transition-colors"
            >Termos</a
          >
          •
          <a
            href="#"
            class="text-blue-400 hover:text-blue-300 transition-colors"
            >Privacidade</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faRightToBracket, faUserPlus)


import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification';

// primeiro garante que tem permissão
async function notify() {
  try {
    // Do you have permission to send a notification?
    let permissionGranted = await isPermissionGranted();
    console.log("isPermissionGranted:", permissionGranted);

    // If not we need to request it
    if (!permissionGranted) {
      const permission = await requestPermission();
      console.log("requestPermission:", permission);
      permissionGranted = permission === 'granted';
    }

    // Once permission has been granted we can send the notification
    if (permissionGranted) {
      await sendNotification({
        title: '📌 Lembrete',
        body: 'Sua tarefa foi concluída!',
      });
    } else {
      console.warn("Notificação não permitida pelo usuário.");
    }
  } catch (e) {
    console.error("Erro ao tentar notificar:", e);
  }
}
</script>

<style scoped>
/* Animações suaves para os botões */
button {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(0);
}

.background-main {
  background: #474a6a;
  background: linear-gradient(
    150deg,
    rgba(71, 74, 106, 1) 4%,
    rgba(17, 17, 18, 0.97) 29%,
    rgba(17, 17, 18, 0.97) 79%,
    rgba(120, 86, 44, 1) 100%
  );
  .btn-login{
    background-color: #3c3f69;
    transition: ease-in-out 0.2s;
    &:hover{
      background-color: #6368a0
    }
  };
  .btn-signup{
    background-color: #996a31;
    transition: ease-in-out 0.3s;
    &:hover{
      background-color: #ca8c41;
    }
  }
  }
</style>
