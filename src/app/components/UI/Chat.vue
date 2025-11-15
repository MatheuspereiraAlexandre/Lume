<template>
  <div class="wrapper " style="height: 70dvh; border-radius: 1rem">
    <div class="text-white p-6 flex gap-5">
      <!-- Menu para mobile -->
      <div v-if="width <= 625" class="optionMenu mb-4">
        <Button
          icon="pi pi-bars"
          @click="menu.toggle($event)"
          class="p-button-text"
        />
        <Menu ref="menu" :model="menuModel" />
      </div>

      <!-- Menu para desktop -->
      <Menu
        ref="menuDesktop"
        style="height: 60dvh; width: 250px; border-right: 1px solid #2a2a2a"
        :model="menuModel"
      />

      <!-- Chat Viewer -->
      <div class="chat-viewer rounded flex-1 flex flex-col justify-between p-4 relative">
        <div v-if="selectedChat" class="flex flex-col h-full">
          <h2 class="mb-4">{{ selectedChat.label }}</h2>

          <!-- Mensagens -->
          <div class="messages flex-1 overflow-y-auto pr-1">
            <div
              v-for="(msg, index) in selectedChat.messages"
              :key="index"
              class="message w-fit mb-2"
            >
              <span class="user text-secondary-blue-300">{{ msg.user }}:</span>
              <span class="text"> {{ msg.text }}</span>
            </div>
          </div>

          <!-- Input de mensagem -->
          <div class="message-input mt-3 flex items-center gap-2">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Digite sua mensagem..."
              class="flex-1 px-3 py-2 bg-[#2a2a2a] text-white border border-[#444] rounded-md focus:outline-none"
              @keyup.enter="sendMessage"
            />
            <Button
              label="Enviar"
              icon="pi pi-send"
              class="p-button-sm p-button-primary bg-secondary-blue-300! p-3! border-none!"
              @click="sendMessage"
            />
          </div>
        </div>

        <div v-else class="text-gray-500 flex-1 flex items-center justify-center">
          Selecione um chat
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import Menu from "primevue/menu";
import Button from "primevue/button";
import { chat } from "../../../Types/Chat-information";

const props = defineProps({
  room: { type: Object, required: false },
});

const width = ref(window.innerWidth);
const menu = ref(null);
const selectedChat = ref(null);
const newMessage = ref(""); // 💬 nova mensagem

// 🔍 Filtra os chats pela sala
const filteredChats = computed(() => {
  if (!props.room) return [];
  return chat.filter((chatItem) => chatItem.roomId === props.room.id);
});

// 🧭 Modelo do menu
const menuModel = computed(() => [
  {
    label: "Chats da Sala",
    items: filteredChats.value.map((chatItem, index) => ({
      label: chatItem.label,
      icon: "pi pi-comments",
      command: () => handleMenuClick(index)
    }))
  },
  {
    label: "Configurações",
    items: [
      { label: "Adicionar sala", icon: "pi pi-plus" }
    ]
  }
]);

function handleMenuClick(index) {
  if (filteredChats.value[index]) {
    selectedChat.value = filteredChats.value[index];
  }
}

//  Enviar mensagem
function sendMessage() {
  if (!newMessage.value.trim() || !selectedChat.value) return;

  selectedChat.value.messages.push({
    user: "Matheus", //  nome fixo (pode trocar depois)
    text: newMessage.value.trim(),
  });

  newMessage.value = ""; // limpa o input
  scrollToBottom();
}

// 🔽 Scroll automático para o fim
function scrollToBottom() {
  setTimeout(() => {
    const el = document.querySelector(".messages");
    if (el) el.scrollTop = el.scrollHeight;
  }, 50);
}

function updateWidth() {
  width.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

watch(filteredChats, (val) => {
  console.log("Chats filtrados:", val);
});
</script>

<style lang="scss" scoped>
.chat-viewer {
  background: #1a1a1a;
  color: white;
  height: 60dvh;
  border: 1px solid #2a2a2a;
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 12px;
  padding-right: 4px;
}

.message {
  padding: 8px;
  background: #3a3a3a;
  border-radius: 6px;
  font-size: 0.9rem;

  .user {
    color: #4cc9f0;
    font-weight: 600;
    margin-right: 6px;
  }

  .text {
    color: #ddd;
  }
}

.message-input {
  position: sticky;
  bottom: 0;
  background: #1a1a1a;
  padding-top: 6px;
}
</style>
