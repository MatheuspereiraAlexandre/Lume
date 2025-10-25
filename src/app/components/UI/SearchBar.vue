<template>
  <header class="fixed top-0 right-0 left-16 h-16 bg-[#0f0f0f] border-b border-[#2a2a2a] z-40 transition-all duration-300">
    <div class="h-full px-6 flex items-center justify-between">
      
      <div class="flex-1 max-w-2xl">
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Pesquisar em tudo..."
            class="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary-orange focus:ring-1 focus:ring-primary-orange transition-colors"
          />
        </div>
      </div>

     
      <div class="flex items-center gap-3 ml-6">
        <button
          class="p-2 rounded-lg text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-colors"
          title="Notificações"
        >
          <Bell class="w-5 h-5" />
        </button>
        <button
          class="p-2 rounded-lg text-gray-400 hover:bg-[#1a1a1a] hover:text-white transition-colors"
          title="Ajuda"
        >
          <HelpCircle class="w-5 h-5" />
        </button>
        <button class="flex items-center gap-2 p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 overflow-hidden">
            <img src="#" alt="Profile" class="w-full h-full object-cover" />
          </div>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Bell, HelpCircle } from 'lucide-vue-next'

const searchQuery = ref('')
</script>