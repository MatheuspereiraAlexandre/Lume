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
        class="card"
        :class="{ dragging: draggingId === card.id }"
        @mousedown="!isResizing && startDrag($event, card.id)"
        :data-card-id="card.id"
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
              <button class="join-btn bg-secondary-orange hover:bg-primary-orange">Entrar</button>
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
              <div class="channel-badge bg-secondary-orange" v-if="channel.unread">
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
              <div class="activity-avatar" :style="{ backgroundColor: activity.color }">
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
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Menu from "primevue/menu";

const menu = ref(null);
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
          localStorage.setItem("activityRoomsCards", JSON.stringify(defaultCards));
          menuItems.value[0].items = cards.value.map((card) => ({
            label: card.title,
            command: () => {
              card.visible = !card.visible;
            },
            icon: card.visible ? "pi pi-check" : "",
          }));
        },
      },
    ],
  },
]);

const activeRooms = [
  { name: "Sala de Desenvolvimento", participants: 8, time: "45 min", emoji: "💻", color: "#4a5568" },
  { name: "Design Sprint", participants: 5, time: "1h 20min", emoji: "🎨", color: "#805ad5" },
  { name: "Matematica 3DS", participants: 15, time: "30 min", emoji: "💙", color: "#2d3748" },
  { name: "Portugues 3DS", participants: 6, time: "2h 10min", emoji: "💡", color: "#d69e2e" },
];

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
  { user: "Pedro", action: "entrou na sala Design Sprint", time: "5 min atrás", initials: "PE", color: "#4299e1" },
  { user: "Matheus", action: "compartilhou um arquivo", time: "12 min atrás", initials: "MA", color: "#48bb78" },
  { user: "Miguel", action: "entrou no canal geral", time: "25 min atrás", initials: "MI", color: "#ed8936" },
  { user: "Lucas", action: "mencionou você em #geral", time: "1h atrás", initials: "LU", color: "#9f7aea" },
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
  
  // Only start drag on left mouse button
  if (event.button !== 0) return;
  
  // Don't drag if clicking on interactive elements
  if (event.target.closest('.card-content *:not(.card-title)')) return;
  
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
  
  // Find the card element under the mouse
  const elements = document.elementsFromPoint(event.clientX, event.clientY);
  const targetCard = elements.find(el => el.classList.contains('card') && !el.classList.contains('dragging'));
  
  if (targetCard) {
    const targetId = parseInt(targetCard.getAttribute('data-card-id'));
    if (targetId && targetId !== draggedCardId) {
      // Swap cards
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
.semi-header {
  display: flex;
  align-items: center;
  height: 6rem;
  width: 98%;
}

.dots-vertical {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40px;
}

.dots-vertical span {
  width: 12px;
  height: 12px;
  border: 3px solid white;
  border-radius: 50%;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  grid-auto-rows: 200px;
}

.card {
  border-radius: 12px;
  padding: 20px;
  position: relative;
  cursor: grab;
  transition: opacity 0.2s, transform 0.1s;
  overflow: hidden;
}

.card:hover {
  border-color: #3a3a3a !important;
}

.card.dragging {
  opacity: 0.5;
  transform: scale(0.95);
}

.resize-handle {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  cursor: nwse-resize;
  color: #666;
  opacity: 0;
  transition: opacity 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: #2a2a2a;
  border-radius: 6px;
}

.card:hover .resize-handle {
  opacity: 1;
}

.resize-handle:hover {
  color: #fff;
  background-color: #3a3a3a;
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.card-content * {
  pointer-events: auto;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #ffffff;
}

.rooms-list {
  overflow-y: auto;
  max-height: calc(100% - 40px);
  padding-right: 8px;
}

.rooms-list::-webkit-scrollbar {
  width: 8px;
}

.rooms-list::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.rooms-list::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 4px;
}

.rooms-list::-webkit-scrollbar-thumb:hover {
  background: #4a4a4a;
}

.room-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  transition: background-color 0.2s;
  &:nth-child(3){
    .status-dot{
      background-color: red;
    }
  }
  &:nth-child(4){
    .status-dot{
      background-color: red;
    }
}
}

.room-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.room-info {
  flex: 1;
  min-width: 0;
}

.room-name {
  color: #ffffff;
  font-weight: 500;
  font-size: 0.9375rem;
  margin-bottom: 4px;
}

.room-participants {
  color: #888;
  font-size: 0.8125rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #48bb78;
 
}

.room-time {
  color: #888;
  font-size: 0.8125rem;
  flex-shrink: 0;
}

.meetings-list {
  overflow-y: auto;
  max-height: calc(100% - 40px);
  padding-right: 8px;
}

.meetings-list::-webkit-scrollbar {
  width: 8px;
}

.meetings-list::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.meetings-list::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 4px;
}

.meetings-list::-webkit-scrollbar-thumb:hover {
  background: #4a4a4a;
}

.meeting-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  transition: background-color 0.2s;
}

.meeting-time-badge {
  background-color: #2a2a2a;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  flex-shrink: 0;
}

.meeting-details {
  flex: 1;
  min-width: 0;
}

.meeting-title {
  color: #ffffff;
  font-weight: 500;
  font-size: 0.9375rem;
  margin-bottom: 4px;
}

.meeting-organizer {
  color: #888;
  font-size: 0.8125rem;
}

.join-btn {

  color: #ffffff;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.channels-list {
  overflow-y: auto;
  max-height: calc(100% - 40px);
  padding-right: 8px;
}

.channels-list::-webkit-scrollbar {
  width: 8px;
}

.channels-list::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.channels-list::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 4px;
}

.channels-list::-webkit-scrollbar-thumb:hover {
  background: #4a4a4a;
}

.channel-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  transition: background-color 0.2s;
}

.channel-icon {
  width: 40px;
  height: 40px;
  background-color: #2a2a2a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #888;
  flex-shrink: 0;
}

.channel-info {
  flex: 1;
  min-width: 0;
}

.channel-name {
  color: #ffffff;
  font-weight: 500;
  font-size: 0.9375rem;
  margin-bottom: 4px;
}

.channel-message {
  color: #888;
  font-size: 0.8125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.channel-badge {
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.activity-list {
  overflow-y: auto;
  max-height: calc(100% - 40px);
  padding-right: 8px;
}

.activity-list::-webkit-scrollbar {
  width: 8px;
}

.activity-list::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.activity-list::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 4px;
}

.activity-list::-webkit-scrollbar-thumb:hover {
  background: #4a4a4a;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #2a2a2a;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-text {
  color: #ffffff;
  font-size: 0.875rem;
  margin-bottom: 4px;
  line-height: 1.4;
}

.activity-text strong {
  font-weight: 600;
}

.activity-time {
  color: #888;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
