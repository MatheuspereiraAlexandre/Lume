<template>
  <main class="ml-16 pt-16 min-h-screen">
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Bem-vindo de volta, Magno</h1>
        <p class="text-gray-400">Aqui está o que está acontecendo hoje</p>
      </div>

      <!-- CARDS -->
      <div class="main-informations grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="informations bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 transition-colors cursor-pointer"
          @click="handleCardClick(index)"
        >
          <div class="flex items-center justify-between mb-4">
            <component
              :is="stat.icon"
              :class="['w-8 h-8', stat.color]"
            />
            <span :class="['text-xs font-medium px-2 py-1 rounded-full', stat.badgeClass]">
              {{ stat.change }}
            </span>
          </div>
          <p class="text-2xl font-bold text-white mb-1">{{ stat.value }}</p>
          <p class="text-sm text-gray-400">{{ stat.label }}</p>
        </div>
      </div>

      <!-- RESTO DO SEU LAYOUT -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Atividades Recentes -->
        <div class="lg:col-span-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-white">Atividades Recentes</h2>
            <button class="text-sm text-primary-orange cursor-pointer hover:text-secondary-orange transition-colors">
              Ver todas
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="activity in activities"
              :key="activity.id"
              class="flex cursor-pointer items-start gap-4 p-4 rounded-lg hover:bg-[#252525] transition-colors"
            >
              <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', activity.iconBg]">
                <component :is="activity.icon" :class="['w-5 h-5', activity.iconColor]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-white mb-1">{{ activity.title || "Loading"}}</p>
                <p class="text-xs text-gray-400">{{ activity.description || "Loading"}}</p>
                <p class="text-xs text-gray-500 mt-1">{{ activity.time  || "Loading"}}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Ações rápidas -->
        <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
          <h2 class="text-xl font-semibold text-white mb-6">Ações Rápidas</h2>
          <div class="space-y-3">
            <button
              v-for="action in quickActions"
              :key="action.label"
              class="fast-actions cursor-pointer w-full flex items-center gap-3 p-4 rounded-lg bg-[#252525] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-primary-orange transition-all group"
            >
              <component
                :is="action.icon"
                class="w-5 h-5 text-gray-400 group-hover:text-secondary-orange transition-colors"
              />
              <span class="text-sm text-white">{{ action.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- ===============================
       DIALOG DO PRIMEVUE (RANKING)
  ================================ -->
  <Dialog
    v-model:visible="showRankingDialog"
    modal
    header="Seu Ranking"
    :style="{ width: '30dvw', height: '70dvh' }"
  >
  <RankDialog></RankDialog>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import RankDialog from './UI/RankDialog.vue'
import {
  MessageSquare,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Video,
  UserPlus,
  FolderPlus
} from 'lucide-vue-next'

const showRankingDialog = ref(false)

function handleCardClick(index) {
  if (index === 3) {
    showRankingDialog.value = true
  }
}

const stats = [
  {
    label: 'Mensagens',
    value: '24',
    change: '+2',
    icon: MessageSquare,
    color: 'text-emerald-400',
    badgeClass: 'bg-emerald-400/10 text-emerald-400'
  },
  {
    label: 'Equipes Ativas',
    value: '4',
    change: '+2',
    icon: Users,
    color: 'text-cyan-400',
    badgeClass: 'bg-cyan-400/10 text-cyan-400'
  },
  {
    label: 'Reuniões Hoje',
    value: '3',
    change: '2 próximas',
    icon: Calendar,
    color: 'text-purple-400',
    badgeClass: 'bg-purple-400/10 text-purple-400'
  },
  {
    label: 'Ranking',
    value: 'Ouro',
    change: '+55%',
    icon: TrendingUp,
    color: 'text-amber-400',
    badgeClass: 'bg-amber-400/10 text-amber-400'
  }
]

const activities = [
  {
    id: 1,
    title: 'Nova mensagem em #desenvolvimento',
    description: 'Arthur comentou sobre o novo projeto',
    time: 'há 5 minutos',
    icon: MessageSquare,
    iconBg: 'bg-emerald-400/10',
    iconColor: 'text-emerald-400'
  },
  {
    id: 2,
    title: 'Reunião agendada',
    description: 'Review semanal com a equipe de design',
    time: 'há 15 minutos',
    icon: Calendar,
    iconBg: 'bg-purple-400/10',
    iconColor: 'text-purple-400'
  },
  {
    id: 3,
    title: 'Documento compartilhado',
    description: 'Matheus compartilhou "Roadmap para o lume"',
    time: 'há 1 hora',
    icon: FileText,
    iconBg: 'bg-cyan-400/10',
    iconColor: 'text-cyan-400'
  },
  {
    id: 4,
    title: 'Novo membro na equipe',
    description: 'Miguel entrou no canal geral',
    time: 'há 2 horas',
    icon: Users,
    iconBg: 'bg-amber-400/10',
    iconColor: 'text-amber-400'
  }
]

const quickActions = [
  { label: 'Nova Reunião', icon: Video },
  { label: 'Criar Equipe', icon: UserPlus },
  { label: 'Novo Projeto', icon: FolderPlus },
  { label: 'Enviar Mensagem', icon: MessageSquare }
]
</script>
