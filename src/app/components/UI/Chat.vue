<template>
  <div class="wrapper border" style="height: 70dvh; border-radius: 1rem">
    <div class="text-white p-6 flex gap-5">
      <!-- Menu para mobile -->
      <div v-if="width <= 625" class="optionMenu mb-4">
        <Button
          type="button"
          icon="pi pi-ellipsis-v"
          @click="toggleMenu"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu ref="menu" id="overlay_menu" :model="menuModel" :popup="true" />
      </div>

      <!-- Menu para desktop -->
      <Menu
        v-else
        :model="menuModel"
        class="Menu mb-4 w-5"
        style="height: 60dvh"
      />

      <!-- Chat Viewer -->
      <div class="chat-viewer p-4 rounded flex-1" v-if="selectedChat">
        <h3 class="mb-2">{{ selectedChat.label }}</h3>
        <div
          v-for="msg in selectedChat.messages"
          :key="msg.id"
          class="mb-1 border-gray-600 pb-1"
        >
        <div class="message-box p-3 gap-2 border-b-[#2a2a2a] border-b-2 flex" style="background-color: #3a3a3a; width: fit-content; border-top-left-radius: 10px; border-top-right-radius: 10px;">
          <p class="user-name ">{{ msg.user || 'desconhecido'}} :</p>
          {{ msg.message }}
        </div>
        </div>
      </div>

      <div v-else class="chat-viewer p-4 rounded flex-1">
        <p>Selecione um chat</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Menu from "primevue/menu";
import Button from "primevue/button";
import { ChatOptions, chat } from "../../../Types/Chat-information";

const width = ref(window.innerWidth);
const menu = ref(null);
const selectedChat = ref(null);

const menuModel = ref(
  ChatOptions.map((section) => ({
    label: section.label,
    items: section.items.map((item, index) => ({
      label: item.label,
      icon: item.icon || "pi pi-comments",
      command: () => handleMenuClick(section.label, index),
    })),
  }))
);

const chatsData = chat.map((chat, index) => ({
  label: `Chat ${index + 1}`,
  messages: chat.messages || [],
}));

function handleMenuClick(sectionLabel, index) {
  if (sectionLabel === "Chats") {
    selectedChat.value = chatsData[index];
  } else if (sectionLabel === "Configuraçãoes") {
    alert("🔧 Função: Adicionar nova sala (a ser implementada)");
  }
}

function updateWidth() {
  width.value = window.innerWidth;
}

function toggleMenu(event) {
  menu.value.toggle(event);
}

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>

<style lang="scss">
.p-menu {
  @media screen and (max-width: 625px) {
    width: 100%;
  }
}

.chat-viewer {
  background: #1a1a1a;
  color: white;
  overflow-y: auto;
  max-height: 60dvh;
  border: 1px solid #2a2a2a;
}
</style>
