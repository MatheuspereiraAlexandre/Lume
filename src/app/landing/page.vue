<template>
  <div
    class="background-main bg-[#1a1a1] min-h-screen flex items-center justify-center p-8"
  >
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <div class="img-logo  flex items-center justify-center">
         <img src="../assets/images/Logo 128.png" class="rounded-4xl" alt="">
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">Bem-vindo</h1>
        <p class="text-gray-400 text-lg">Seu workspace pessoal</p>
      </div>

      <div class="mb-10">
        <h2 class="text-xl text-gray-300 mb-4 leading-relaxed">
          Organize seus projetos, colabore com sua equipe e mantenha tudo
          sincronizado em um só lugar.
        </h2>
        <p class="text-gray-500 text-sm">
          Comece sua jornada de produtividade hoje mesmo.
        </p>
      </div>

      <div class="space-y-4">
        <router-link to="/signin"
          class="btn-login w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          Fazer Login
        </router-link>

        <router-link to="/signup"
          class="btn-signup w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
           <p>Cadastrar-se</p>
        </router-link>

        <div class="flex items-center justify-center mt-6">
          <div class="border-t border-gray-700 flex-grow"></div>
          <span class="px-4 text-gray-500 text-sm">ou</span>
          <div class="border-t border-gray-700 flex-grow"></div>
        </div>

        <router-link
          to="/main-page"
          class="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2 px-6 rounded-lg transition-colors duration-200 text-sm"
        >
          Continuar sem conta
        </router-link>
      </div>

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

<style scoped lang="scss">
*{
  user-select: none;
}
button {
  height: 5dvh;
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 800px) {
    height: 6.5dvh;
  }
  cursor: pointer;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(0);
}


.btn-login {
  background-color: #3c3f69;
  transition: ease-in-out 0.2s;
  &:hover{
    background-color: #5f63a8;
  }
}
.btn-signup {
  background-color: #996a31;
  transition: ease-in-out 0.3s;
  &:hover{
    background-color: #ca8d42;
  }
}
</style>
