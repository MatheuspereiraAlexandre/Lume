<template>
  <div class="min-h-screen p-4" style="background-color: #0a0a0a">
    <div class="semi-header flex justify-between">
      <h1 class="text-2xl font-bold mb-6" style="color: #ffffff">
        Salas de Atividades
      </h1>
      <button
        class="cards-options cursor-pointer w-8 h-16 flex justify-center items-center"
        @click="showMenu($event)"
      >
        <div class="dots-vertical">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <Menu :model="menuItems" ref="menu" popup />
    </div>

    <div class="grid-container">
      <div
        v-for="card in cards.filter((c) => c.visible)"
        :key="card.id"
        :style="{
          gridColumn: `span ${card.width}`,
          gridRow: `span ${card.height}`,
          backgroundColor: '#1a1a1a',
          border: '1px solid #2a2a2a',
        }"
        class="card cursor-pointer"
        :class="{ dragging: draggingId === card.id }"
        @mousedown="!isResizing && startDrag($event, card.id)"
      >
        <div
          class="resize-handle"
          @mousedown.stop="startResize($event, card.id)"
          title="Redimensionar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M14 2L2 14M14 8L8 14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <div class="card-content">
          <h2 class="card-title">{{ card.title }}</h2>

          <!-- Salas Ativas -->
          <div v-if="card.id === 1" class="rooms-list">
            <div
              class="room-item cursor-pointer hover:bg-[#2a2a2a] rounded-xl"
              v-for="(room, index) in activeRooms"
              :key="index"
              @click="openRoom(room)"
              :data-card-id="card.id"
            >
              <div class="room-icon" :style="{ backgroundColor: room.color }">
                {{ room.emoji }}
              </div>
              <div class="room-info">
                <div class="room-name">{{ room.name }}</div>
                <div class="room-participants">
                  <span class="status-dot active"></span>
                  {{ room.participants }} participantes
                </div>
              </div>
              <div class="room-time">{{ room.time }}</div>
            </div>
          </div>

          <!-- Próximas Reuniões -->
          <div v-else-if="card.id === 2" class="meetings-list">
            <div
              class="meeting-item cursor-pointer hover:bg-[#2a2a2a] rounded-xl"
              v-for="(meeting, index) in upcomingMeetings"
              :key="index"
            >
              <div class="meeting-time-badge">{{ meeting.time }}</div>
              <div class="meeting-details">
                <div class="meeting-title">{{ meeting.title }}</div>
                <div class="meeting-organizer">{{ meeting.organizer }}</div>
              </div>
              <button
                class="join-btn bg-secondary-orange hover:bg-primary-orange"
              >
                Entrar
              </button>
            </div>
          </div>

          <!-- Canais Recentes -->
          <div v-else-if="card.id === 3" class="channels-list">
            <div
              class="channel-item cursor-pointer hover:bg-[#2a2a2a] rounded-xl"
              v-for="(channel, index) in recentChannels"
              :key="index"
            >
              <div class="channel-icon">#</div>
              <div class="channel-info">
                <div class="channel-name">{{ channel.name }}</div>
                <div class="channel-message">{{ channel.lastMessage }}</div>
              </div>
              <div
                class="channel-badge bg-secondary-orange"
                v-if="channel.unread"
              >
                {{ channel.unread }}
              </div>
            </div>
          </div>

          <!-- Atividade Recente -->
          <div v-else-if="card.id === 4" class="activity-list">
            <div
              class="activity-item"
              v-for="(activity, index) in recentActivity"
              :key="index"
            >
              <div
                class="activity-avatar"
                :style="{ backgroundColor: activity.color }"
              >
                {{ activity.initials }}
              </div>
              <div class="activity-content">
                <div class="activity-text">
                  <strong>{{ activity.user }}</strong> {{ activity.action }}
                </div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DIALOG -->
      <Dialog
        v-model:visible="visible"
        modal
        :header="selectedRoomName"
        draggable
        resizable
        class="Dialog-team"
        :breakpoints="{ '960px': '75vw', '640px': '95vw' }"
        :style="{ width: '80dvw', height: '90dvh' }"
      >
        <TeamsPage v-if="visible" :room-id="selectedRoomId" />
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Menu from "primevue/menu";
import { activeRooms } from "../../Types/ActivateRooms";
import TeamsPage from "./UI/teams-page.vue";

const menu = ref(null);
const visible = ref(false);
const selectedRoomId = ref(null);
const selectedRoomName = ref("Sala de Equipe");
const openRoom = (room) => {
  selectedRoomId.value = room.id;
  selectedRoomName.value = room.name; 
  visible.value = true;
};

const handleCardClick = (id) => {
  if (id === 1) {
    openRoom(1);
  }
};

const isResizing = ref(false);
const draggingId = ref(null);
const resizingCard = ref(null);
const startPos = ref({ x: 0, y: 0 });
const startSize = ref({ width: 0, height: 0 });

const defaultCards = [
  { id: 1, title: "Salas Ativas", width: 1, height: 2, visible: true },
  { id: 2, title: "Próximas Reuniões", width: 1, height: 2, visible: true },
  { id: 3, title: "Canais Recentes", width: 1, height: 2, visible: true },
  { id: 4, title: "Atividade Recente", width: 1, height: 2, visible: true },
];

const cards = ref(
  JSON.parse(localStorage.getItem("activityRoomsCards")) || [...defaultCards]
);

const menuItems = ref([
  {
    label: "Mostrar Cards",
    items: cards.value.map((card) => ({
      label: card.title,
      command: () => {
        card.visible = !card.visible;
      },
      icon: card.visible ? "pi pi-check" : "",
    })),
  },
  {
    label: "Resetar",
    items: [
      {
        label: "Voltar ao padrão",
        command: () => {
          cards.value = [...defaultCards];
          localStorage.setItem(
            "activityRoomsCards",
            JSON.stringify(defaultCards)
          );
        },
      },
    ],
  },
]);

const upcomingMeetings = [
  { time: "14:00", title: "Sprint semanal", organizer: "Lume members" },
  { time: "15:30", title: "Revisão para prova", organizer: "Lucas" },
  { time: "17:00", title: "Organização dos seminarios", organizer: "Fidelis" },
];

const recentChannels = [
  { name: "geral", lastMessage: "Alguém viu o relatório?", unread: 3 },
  { name: "desenvolvimento", lastMessage: "PR aprovado ✓", unread: 0 },
  { name: "design", lastMessage: "Novos mockups disponíveis", unread: 5 },
  { name: "marketing", lastMessage: "Campanha lançada!", unread: 1 },
];

const recentActivity = [
  {
    user: "Pedro",
    action: "entrou na sala Design Sprint",
    time: "5 min atrás",
    initials: "PE",
    color: "#4299e1",
  },
  {
    user: "Matheus",
    action: "compartilhou um arquivo",
    time: "12 min atrás",
    initials: "MA",
    color: "#48bb78",
  },
  {
    user: "Miguel",
    action: "entrou no canal geral",
    time: "25 min atrás",
    initials: "MI",
    color: "#ed8936",
  },
  {
    user: "Lucas",
    action: "mencionou você em #geral",
    time: "1h atrás",
    initials: "LU",
    color: "#9f7aea",
  },
];

watch(
  cards,
  (newVal) => {
    localStorage.setItem("activityRoomsCards", JSON.stringify(newVal));
  },
  { deep: true }
);

function showMenu(event) {
  menu.value.toggle(event);
}

let draggedCardId = null;
let draggedCardIndex = null;
let isDragging = false;

function startDrag(event, cardId) {
  if (isResizing.value) return;
  if (event.button !== 0) return;
  if (event.target.closest(".resize-handle")) return; // evita conflito com resize

  isDragging = true;
  draggingId.value = cardId;
  draggedCardId = cardId;
  draggedCardIndex = cards.value.findIndex((c) => c.id === cardId);

  document.addEventListener("mousemove", handleDrag);
  document.addEventListener("mouseup", endDrag);
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
}

function handleDrag(event) {
  if (!isDragging) return;

  const elements = document.elementsFromPoint(event.clientX, event.clientY);
  const targetCard = elements.find(
    (el) => el.classList.contains("card") && !el.classList.contains("dragging")
  );

  if (targetCard) {
    const targetId = parseInt(targetCard.getAttribute("data-card-id"));
    if (targetId && targetId !== draggedCardId) {
      const targetIndex = cards.value.findIndex((c) => c.id === targetId);
      if (targetIndex !== -1 && draggedCardIndex !== -1) {
        const temp = cards.value[draggedCardIndex];
        cards.value[draggedCardIndex] = cards.value[targetIndex];
        cards.value[targetIndex] = temp;
        draggedCardIndex = targetIndex;
      }
    }
  }
}

function endDrag() {
  isDragging = false;
  draggingId.value = null;
  draggedCardId = null;
  draggedCardIndex = null;
  document.removeEventListener("mousemove", handleDrag);
  document.removeEventListener("mouseup", endDrag);
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

function startResize(event, cardId) {
  event.preventDefault();
  event.stopPropagation();

  isResizing.value = true;
  resizingCard.value = cardId;
  startPos.value = { x: event.clientX, y: event.clientY };

  const card = cards.value.find((c) => c.id === cardId);
  startSize.value = { width: card.width, height: card.height };

  document.addEventListener("mousemove", handleResize);
  document.addEventListener("mouseup", stopResize);
  document.body.style.cursor = "nwse-resize";
  document.body.style.userSelect = "none";
}

function handleResize(event) {
  if (!isResizing.value || !resizingCard.value) return;

  const card = cards.value.find((c) => c.id === resizingCard.value);
  if (!card) return;

  const deltaX = event.clientX - startPos.value.x;
  const deltaY = event.clientY - startPos.value.y;

  const cellSize = 300;
  card.width = Math.min(
    3,
    Math.max(1, Math.round(startSize.value.width + deltaX / cellSize))
  );
  card.height = Math.min(
    3,
    Math.max(1, Math.round(startSize.value.height + deltaY / cellSize))
  );
}

function stopResize() {
  isResizing.value = false;
  resizingCard.value = null;
  document.removeEventListener("mousemove", handleResize);
  document.removeEventListener("mouseup", stopResize);
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}
</script>

<style lang="scss" scoped>
@use "./scss/Teams.scss";
</style>
