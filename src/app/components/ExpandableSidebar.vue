<template>
  <aside
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
    :class="[
      'fixed left-0 top-0 h-screen bg-[#1a1a1a] border-r border-[#2a2a2a] transition-all duration-300 ease-in-out z-50 flex flex-col',
      isExpanded ? 'w-64' : 'w-16'
    ]"
  >
    <!-- avatar -->
    <div class="p-4 border-b border-[#2a2a2a]">
      <div class="flex items-center gap-3 cursor-pointer" @click="showDialog = true">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-orange to-secondary-blue-200 flex-shrink-0 overflow-hidden">
          <img src="#" alt="Profile" class="w-full h-full object-cover" />
        </div>
        <div v-show="isExpanded" class="overflow-hidden">
          <span class="text-sm font-medium text-white truncate">Magnoneves</span>
          <p class="text-xs text-gray-400 truncate">Disponível</p>
        </div>
      </div>
    </div>

    <!-- navegação -->
    <nav class="flex-1 py-4 overflow-y-auto">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="handleClick(item.id)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 transition-colors relative group',
          activeItem === item.id
            ? 'bg-[#2a2a2a] text-secondary-orange'
            : 'text-gray-400 hover:bg-[#252525] hover:text-white'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-show="isExpanded" class="text-sm font-medium truncate">
          {{ item.label }}
        </span>
        <div
          v-if="activeItem === item.id"
          class="absolute left-0 top-0 bottom-0 w-1 bg-secondary-orange"
        />
      </button>
    </nav>

    <!-- settings -->
    <div class="border-t border-[#2a2a2a] p-2">
      <button
        @click="activeItem = 'settings'"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
          activeItem === 'settings'
            ? 'bg-[#2a2a2a] text-secondary-orange'
            : 'text-gray-400 hover:bg-[#252525] hover:text-white'
        ]"
      >
        <Settings class="w-5 h-5 flex-shrink-0" />
        <span v-show="isExpanded" class="text-sm font-medium truncate">
          Configurações
        </span>
      </button>
    </div>
  </aside>

  <!-- ==========================
     DIALOG DO PRIMEVUE
  =========================== -->
  <Dialog
    v-model:visible="showDialog"
    modal
    header="Perfil do Usuário"
    :style="{ width: '70dvw' }"
  >
    <!-- Componente que será renderizado dentro do dialog -->
    <UserProfile />
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog'

// componente que será exibido dentro do dialog 👇
import UserProfile from './UI/UserProfile.vue'

import { Activity, House, Users, MessageSquare, Calendar, Settings } from 'lucide-vue-next'

const emit = defineEmits(['update-active'])

const isExpanded = ref(false)
const activeItem = ref('dashboard')
const showDialog = ref(false)

const navItems = [
  { id: 'dashboard', label: 'Geral', icon: House },
  { id: 'activity', label: 'Atividades', icon: Activity },
  { id: 'teams', label: 'Equipes', icon: Users },
]

function handleClick(id) {
  activeItem.value = id
  emit('update-active', id)
}
</script>
