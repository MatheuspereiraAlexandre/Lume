<template>
  <div class="wrapper w-full">
    <!-- Menubar com o header importado -->
    <Menubar :model="menuItems" />

    <!-- Conteúdo dinâmico dentro do mesmo Dialog -->
    <div class="p-4">
      <transition name="fade" mode="out-in">
        <div :key="activeView">
          <div v-if="activeView === 'chat'">
            <!-- ✅ Aqui passamos a prop "room" -->
            <Chat :room="room" />
          </div>

          <div v-else-if="activeView === 'imagens'">
            <h3>🖼️ Imagens da sala</h3>
            <p>Nenhuma imagem enviada ainda.</p>
          </div>

          <div v-else-if="activeView === 'compactados'">
            <h3>🗜️ Arquivos compactados</h3>
            <p>Sem arquivos ZIP no momento.</p>
          </div>

          <div v-else-if="activeView === 'trabalhos'">
            <Works  :room="room"></Works>
          </div>

          <div v-else-if="activeView === 'config'">
            <h3>⚙️ Configurações</h3>
            <p>Opções de personalização da sala.</p>
          </div>

          <div v-else>
            <p class="text-gray-400">Selecione uma opção acima 👆</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Menubar from "primevue/menubar";
import { getRoomById } from "../../../Types/ActivateRooms";
import { header } from "../../../Types/Header-class";
import Chat from "./Chat.vue";
import Works from "./Works.vue";
const props = defineProps({
  roomId: {
    type: Number,
    required: true,
  },
});

const room = computed(() => getRoomById(props.roomId));
const activeView = ref("");
const messages = ref(["Olá 👋", "Bem-vindo à sala!"]);

const menuItems = header.map((item) => {
  const newItem = { ...item };

  if (item.label === "Canal de conversa")
    newItem.command = () => (activeView.value = "chat");

  if (item.label === "Arquivos") {
    newItem.items = item.items.map((sub) => {
      if (sub.label === "Imagens")
        return { ...sub, command: () => (activeView.value = "imagens") };
      if (sub.label === "Compactados")
        return { ...sub, command: () => (activeView.value = "compactados") };
      return sub;
    });
  }

  if (item.label === "Trabalhos")
    newItem.command = () => (activeView.value = "trabalhos");

  if (item.label === "Configurações")
    newItem.command = () => (activeView.value = "config");

  return newItem;
});
</script>

<style lang="scss">
.p-menubar {
  padding: 4px;
  border: 2px solid #3a3a3a !important;
  background-color: #141414;
}

.p-menubar-item-label {
  color: var(--color-secondary-blue-300);
}

.chat-box {
  border: 1px solid #333;
  padding: 8px;
  height: 150px;
  overflow-y: auto;
  border-radius: 6px;
  background-color: #1a1a1a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
