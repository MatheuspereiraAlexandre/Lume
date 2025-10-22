<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white">
    <ExpandableSidebar @update-active="setActive" />
    <MainHeader />

    <main class="ml-16 pt-16 min-h-screen  transition-all">
      <component :is="currentComponent" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ExpandableSidebar from '../Components/SidebarEx.vue'
import MainHeader from '../Components/SearchBar.vue'

// importa as views
import Dashboard from '../Components/views/Dashboard.vue'
import Activity from '../Components/views/Activity.vue'
import Teams from '../Components/views/Teams.vue'
import Chats from '../Components/views/Chat.vue'
import Calendar from '../Components/views/Calendar.vue'

// estado atual
const activeView = ref('dashboard')

// mapeamento
const componentsMap = {
  dashboard: Dashboard,
  activity: Activity,
  teams: Teams,
  chats: Chats,
  calendar: Calendar
}

// computado pra trocar dinamicamente
const currentComponent = computed(() => componentsMap[activeView.value] || Dashboard)

// função de atualização do menu lateral
function setActive(view) {
  activeView.value = view
}
</script>
