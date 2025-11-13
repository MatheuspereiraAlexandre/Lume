<template>
  <div class="min-h-screen p-4" style="background-color: #0a0a0a">
    <div class="semi-header flex justify-between">
      <h1 class="text-2xl font-bold mb-6 flex" style="color: #ffffff; width: auto !important;">
       <p class="good-morning text-secondary-orange">Boa noite</p> , {{ nome || "usuario"}}
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
          border: '1px solid #2a2a2a',  // o height esta totalmente quebrado arrumar isso com urgencia  // adicionar o height personalizado dps 
        }"
        class="card border-2 border-secondary-blue-100 hover:border-secondary-blue-200"
        :class="{ dragging: draggingId === card.id }"
        :data-card-id="card.id"
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
          <div v-if="card.id === 1" class="recentes-list">
            <div
              class="recentes-item cursor-pointer m-1 hover:bg-[#2a2a2a] rounded-xl"
              v-for="(item, index) in recentItems"
              :key="index"
            >
              <span class="bullet">⦿</span>
              <div class="item-content">
                <span class="item-title">{{ item.title }}</span>
                <span class="item-subtitle">• {{ item.subtitle }}</span>
              </div>
            </div>
          </div>
          <div v-else-if="card.id === 2" class="agenda-content">
            <div class="agenda-header"></div>
          </div>
          <div v-else-if="card.id === 3" class="empty-state">
            <div v-show="isCard3Expanded" class="empty-icon">📋</div>
            <p v-show="isCard3Expanded" style="color: #888; font-size: 0.875rem">
              A lista pessoal contém todas as suas tarefas.
            </p>
            <button class="add-btn">+ Criar uma tarefa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import Menu from "primevue/menu";
import { label } from "@primeuix/themes/aura/metergroup";
import { title } from "@primeuix/themes/aura/card";
import { content } from "@primeuix/themes/aura/accordion";

const menu = ref(null);
const isResizing = ref(false);
const draggingId = ref(null);
const resizingCard = ref(null);
const startPos = ref({ x: 0, y: 0 });
const startSize = ref({ width: 0, height: 0 });

const defaultCards = [
  { id: 1, title: "Recentes", width: 1, height: 2, visible: true },
  { id: 2, title: "Tarefas pendentes", width: 1, height: 2, visible: true },
  { id: 3, title: "Lista pessoal", width: 1, height: 2, visible: true },
  { id: 4, title: "Progresso semanal", width: 1, height: 2, visible: true },
];

const cards = ref(
  JSON.parse(localStorage.getItem("cards")) || [...defaultCards]
);

const cardOptions = ref([
  {
    id: 1,
    title: "Resetar",
  },
  {
    id: 2,
    title: "Opções",
  },
]);

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
          localStorage.removeItem("cards");
          cards.value = JSON.parse(JSON.stringify(defaultCards));
          menuItems.value[0].items = cards.value.map((card) => ({
            label: card.title,
            command: () => {
              card.visible = !card.visible;
            },
            icon: card.visible ? "pi pi-check" : "",
          }));
        },
      },
      { label: "Opções" },
    ],
  },
]);

const recentItems = [
  { title: "Tarefa 1", subtitle: "em Projeto 1" },
  { title: "Tarefa 3", subtitle: "em Projeto 1" },
  { title: "Tarefa 2", subtitle: "em Projeto 1" },
];

watch(
  cards,
  (newVal) => {
    localStorage.setItem("cards", JSON.stringify(newVal));
  },
  { deep: true }
);

function showMenu(event) {
  menu.value.toggle(event);
}

let IdBrutal = null; // id do dragged card
let draggedCardIndex = null;
let isDragging = false;

function startDrag(event, cardId) {
  if (isResizing.value) return;

  if (event.button !== 0) return;

  if (event.target.closest(".card-content *:not(.card-title)")) return;

  isDragging = true;
  draggingId.value = cardId;
  IdBrutal = cardId;
  draggedCardIndex = cards.value.findIndex((c) => c.id === cardId);

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("mouseup", endDrag);
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
}

function handleDragMove(event) {
  if (!isDragging) return;

  const elements = document.elementsFromPoint(event.clientX, event.clientY);
  const targetCard = elements.find(
    (el) => el.classList.contains("card") && !el.classList.contains("dragging")
  );

  if (targetCard) {
    const targetId = parseInt(targetCard.getAttribute("data-card-id"));
    if (targetId && targetId !== IdBrutal) {
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
  IdBrutal = null;
  draggedCardIndex = null;
  document.removeEventListener("mousemove", handleDragMove);
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

const cardHeights = ref({});

const getCardHeight = (card) => {
  return card.height * 200; // 200px por grid row
};

const isCard3Expanded = computed(() => {
  const card3 = cards.value.find((c) => c.id === 3);
  return card3 && getCardHeight(card3) > 200;
});
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

.recentes-list {
  overflow-y: auto;
  max-height: calc(100% - 40px);
  padding-right: 8px;
}

.recentes-list::-webkit-scrollbar {
  width: 8px;
}

.recentes-list::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.recentes-list::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 4px;
}

.recentes-list::-webkit-scrollbar-thumb:hover {
  background: #4a4a4a;
}

.recentes-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px 0;
  color: #ffffff;
  font-size: 0.875rem;
}

.bullet {
  color: #666;
  font-size: 1rem;
  line-height: 1.4;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-title {
  color: #ffffff;
  &:hover {
    color: var(--color-secondary-orange);
  }
}

.item-subtitle {
  font-size: 0.8125rem;
  color: var(--color-secondary-blue-200);
  &:hover {
    color: var(--color-secondary-blue-300);
  }
}

.agenda-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.agenda-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.agenda-nav {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-btn {
  background: #2a2a2a;
  border: none;
  color: #888;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: #3a3a3a;
  color: #fff;
}

.today-btn {
  background: #2a2a2a;
  border: none;
  color: #888;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
}

.today-btn:hover {
  background: #3a3a3a;
  color: #fff;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  opacity: 0.3;
}

.add-btn {
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  margin-top: 8px;
}

.add-btn:hover {
  background: #3a3a3a;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
</style>
