<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white">
    <ExpandableSidebar @update-active="setActive" />
    <MainHeader />

    <main class="ml-16 pt-16 min-h-screen  transition-all">
      <!-- Passe a prop autoOpenId para Teams -->
      <component 
        :is="currentComponent" 
        :auto-open-room-id="activeView === 'teams' ? autoOpenId : null"
      />
    </main>
  </div>
</template>

<script lang="ts" setup> 
import { ref, computed, onMounted, nextTick, watch }  from 'vue'
import { useRoute } from "vue-router";
import type { Component } from 'vue'

import Teams             from '/src/app/components/Teams.vue'
import ExpandableSidebar from '/src/app/components/ExpandableSidebar.vue'
import Dashboard         from '/src/app/components/Dashboard.vue'
import Activity          from '/src/app/components/Activity.vue'

import Chats      from '/src/app/components/UI/Chat.vue'
import MainHeader from '/src/app/components/UI/SearchBar.vue'
import Calendar   from '/src/app/components/UI/Calendar.vue'

// Define os nomes válidos das views
type ViewName = 'dashboard' | 'activity' | 'teams' | 'chats' | 'calendar'

// Estado reativo com tipo explícito
const activeView = ref<ViewName>('dashboard')
const route = useRoute();
const autoOpenId = ref<number | null>(null);

// Mapeamento com tipagem explícita
const componentsMap: Record<ViewName, Component> = {
  dashboard: Dashboard,
  activity: Activity,
  teams: Teams,
  chats: Chats,
  calendar: Calendar
}

// Computado para trocar dinamicamente o componente
const currentComponent = computed<Component>(() => {
  return componentsMap[activeView.value] || Dashboard
})

// Função para atualizar a view ativa com verificação de tipo
function setActive(view: ViewName) {
  activeView.value = view
}

onMounted(() => {
  console.log("🟦 Main.vue mounted");
  console.log("🟦 Route query:", route.query);

  nextTick(() => {
    console.log("🟩 Main onMounted - route.query:", route.query);
    if (route.query.openRoomId) {
      autoOpenId.value = Number(route.query.openRoomId);
      console.log("🟨 autoOpenId setado para:", autoOpenId.value);
      // força a view para 'teams' quando tiver openRoomId
      activeView.value = 'teams';
      console.log("🟧 activeView mudado para: teams");
    }
  });
});
</script>
