<template>
  <div class="rank-container">
    <!-- Header -->
    <div class="rank-header">
      <h1>Seu Rank</h1>
    </div>

    <!-- Rank Atual -->
    <div class="current-rank-section">
      <div class="rank-badge" :class="`rank-${currentRank.id}`">
        <!-- Melhorado SVG com stroke para melhor contraste e visibilidade em fundos escuros -->
        <svg class="rank-mineral" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g v-if="currentRank.id === 'cobre'">
            <polygon points="50,10 85,35 70,80 30,80 15,35" fill="currentColor" stroke="#2a2a2a" stroke-width="2"/>
            <polygon points="50,25 70,40 60,70 40,70 30,40" fill="currentColor" opacity="0.7" stroke="#2a2a2a" stroke-width="1"/>
          </g>
          <g v-else-if="currentRank.id === 'bronze'">
            <circle cx="50" cy="50" r="35" fill="currentColor" stroke="#2a2a2a" stroke-width="2"/>
            <circle cx="50" cy="50" r="25" fill="currentColor" opacity="0.6" stroke="#2a2a2a" stroke-width="1"/>
            <polygon points="50,20 65,45 50,65 35,45" fill="currentColor" opacity="0.8" stroke="#2a2a2a" stroke-width="1"/>
          </g>
          <g v-else-if="currentRank.id === 'prata'">
            <polygon points="50,15 80,40 75,75 25,75 20,40" fill="currentColor" stroke="#1a1a1a" stroke-width="2"/>
            <polygon points="50,30 65,50 62,65 38,65 35,50" fill="currentColor" opacity="0.6" stroke="#1a1a1a" stroke-width="1"/>
            <path d="M50,20 L70,35 L65,55 L50,60 L35,55 L30,35" fill="currentColor" opacity="0.7" stroke="#1a1a1a" stroke-width="1"/>
          </g>
          <g v-else-if="currentRank.id === 'ouro'">
            <polygon points="50,10 90,35 80,85 20,85 10,35" fill="currentColor" stroke="#333" stroke-width="2"/>
            <polygon points="50,25 75,45 70,75 30,75 25,45" fill="currentColor" opacity="0.7" stroke="#333" stroke-width="1"/>
            <polygon points="50,35 65,50 62,65 38,65 35,50" fill="currentColor" opacity="0.5" stroke="#333" stroke-width="1"/>
          </g>
          <g v-else-if="currentRank.id === 'platina'">
            <polygon points="50,15 85,35 88,75 12,75 15,35" fill="currentColor" stroke="#1a1a1a" stroke-width="2"/>
            <polygon points="50,25 75,42 77,65 23,65 25,42" fill="currentColor" opacity="0.7" stroke="#1a1a1a" stroke-width="1"/>
            <path d="M50,30 L68,48 L65,60 L50,65 L35,60 L32,48" fill="currentColor" opacity="0.5" stroke="#1a1a1a" stroke-width="1"/>
          </g>
          <g v-else-if="currentRank.id === 'ametista'">
            <polygon points="50,10 85,30 90,70 55,90 20,70 10,30" fill="currentColor" stroke="#2a2a2a" stroke-width="2"/>
            <polygon points="50,20 75,38 78,68 50,85 22,68 25,38" fill="currentColor" opacity="0.7" stroke="#2a2a2a" stroke-width="1"/>
            <polygon points="50,30 70,43 72,62 50,72 28,62 30,43" fill="currentColor" opacity="0.5" stroke="#2a2a2a" stroke-width="1"/>
          </g>
        </svg>
        <h2 class="rank-name text-white!">{{ currentRank.name }}</h2>
        <p class="rank-level text-white!">Nível {{ currentRank.level }}</p>
      </div>

      <div class="points-info">
        <div class="total-points">
          <span class="label">Pontos Totais</span>
          <span class="value">{{ userPoints }}</span>
        </div>
        <div class="rank-points">
          <span class="label">Pontos para Próximo Rank</span>
          <span class="value">{{ pointsToNext }}</span>
        </div>
      </div>
    </div>

    <!-- Barra de Progresso -->
    <div class="progress-section">
      <div class="progress-label">
        <span>Progresso</span>
        <span class="percentage">{{ progressPercentage }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
    </div>

    <!-- Ranks Disponíveis -->
    <div class="ranks-list">
      <h3>Hierarquia de Ranks</h3>
      <div class="ranks-grid">
        <div
          v-for="rank in ranks"
          :key="rank.id"
          class="rank-item"
          :class="{ 'rank-item-active': rank.id === currentRank.id }"
        >
          <!-- Ícones de minério em SVG nos ranks -->
          <div class="rank-item-badge" :class="`rank-${rank.id}`">
            <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <g v-if="rank.id === 'cobre'">
                <polygon points="30,8 50,20 42,48 18,48 10,20" fill="currentColor" opacity="0.8"/>
              </g>
              <g v-else-if="rank.id === 'bronze'">
                <circle cx="30" cy="30" r="20" fill="currentColor" opacity="0.8"/>
                <circle cx="30" cy="30" r="14" fill="currentColor" opacity="0.5"/>
              </g>
              <g v-else-if="rank.id === 'prata'">
                <polygon points="30,10 48,25 45,45 15,45 12,25" fill="currentColor" opacity="0.8"/>
                <polygon points="30,18 42,30 40,40 20,40 18,30" fill="currentColor" opacity="0.5"/>
              </g>
              <g v-else-if="rank.id === 'ouro'">
                <polygon points="30,5 55,20 50,50 10,50 5,20" fill="currentColor" opacity="0.8"/>
                <polygon points="30,15 45,28 42,42 18,42 15,28" fill="currentColor" opacity="0.5"/>
              </g>
              <g v-else-if="rank.id === 'platina'">
                <polygon points="30,8 52,22 55,48 5,48 8,22" fill="currentColor" opacity="0.8"/>
                <polygon points="30,16 45,28 48,42 12,42 15,28" fill="currentColor" opacity="0.5"/>
              </g>
              <g v-else-if="rank.id === 'ametista'">
                <polygon points="30,5 52,18 58,42 30,58 2,42 8,18" fill="currentColor" opacity="0.8"/>
                <polygon points="30,12 48,24 52,40 30,50 8,40 12,24" fill="currentColor" opacity="0.5"/>
              </g>
            </svg>
          </div>
          <div class="rank-item-info">
            <p class="rank-item-name">{{ rank.name }}</p>
            <p class="rank-item-points">{{ rank.requiredPoints }} pts</p>
          </div>
          <div v-if="rank.id === currentRank.id" class="rank-checkmark">✓</div>
        </div>
      </div>
    </div>

    <!-- Histórico de Pontuação -->
    <!-- Nova seção com histórico de atividades que geraram pontos -->
    <div class="history-section">
      <h3>Histórico de Pontuação</h3>
      <div class="history-list">
        <div v-for="(activity, index) in activityHistory" :key="index" class="history-item">
          <div class="history-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div class="history-content">
            <p class="history-activity">{{ activity.title }}</p>
            <p class="history-description">{{ activity.description }}</p>
          </div>
          <div class="history-points">+{{ activity.points }}</div>
        </div>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="stats-section">
      <h3>Estatísticas</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Atividades Completas</span>
          <span class="stat-value">{{ stats.activitiesCompleted }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Semana Atual</span>
          <span class="stat-value">{{ stats.weekPoints }} pts</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Posição</span>
          <span class="stat-value">#{{ stats.position }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Sequência</span>
          <span class="stat-value">{{ stats.streak }} dias</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  userRank: {
    type: String,
    default: 'ouro'
  },
  userPoints: {
    type: Number,
    default: 7500
  }
})

const emit = defineEmits(['close'])

const ranks = [
  {
    id: 'cobre',
    name: 'Cobre',
    requiredPoints: 0,
    level: 1,
    color: '#B87333'
  },
  {
    id: 'bronze',
    name: 'Bronze',
    requiredPoints: 1000,
    level: 2,
    color: '#CD7F32'
  },
  {
    id: 'prata',
    name: 'Prata',
    requiredPoints: 3000,
    level: 3,
    color: '#C0C0C0'
  },
  {
    id: 'ouro',
    name: 'Ouro',
    requiredPoints: 6000,
    level: 4,
    color: '#FFD700'
  },
  {
    id: 'platina',
    name: 'Platina',
    requiredPoints: 10000,
    level: 5,
    color: '#E5E4E2'
  },
  {
    id: 'ametista',
    name: 'Ametista',
    requiredPoints: 15000,
    level: 6,
    color: '#9966CC'
  }
]

const activityHistory = [
  {
    title: 'Você concluiu Atividade de Matemática',
    description: 'Entrega no prazo com excelência',
    points: 300
  },
  {
    title: 'Você concluiu Projeto Final',
    description: 'Nota máxima obtida',
    points: 500
  },
  {
    title: 'Você concluiu Quiz de Inglês',
    description: 'Acertou 100% das questões',
    points: 200
  },
  {
    title: 'Você concluiu Trabalho em Grupo',
    description: 'Liderança e colaboração destacadas',
    points: 350
  },
  {
    title: 'Você concluiu Redação',
    description: 'Entrega com antecedência',
    points: 150
  }
]

const stats = {
  activitiesCompleted: 42,
  weekPoints: 1200,
  position: 5,
  streak: 12
}

const currentRank = computed(() => {
  return ranks.find(r => r.id === props.userRank) || ranks[0]
})

const pointsToNext = computed(() => {
  const nextRankIndex = ranks.findIndex(r => r.id === currentRank.value.id) + 1
  if (nextRankIndex >= ranks.length) return 0
  return ranks[nextRankIndex].requiredPoints - props.userPoints
})

const progressPercentage = computed(() => {
  const currentRankPoints = currentRank.value.requiredPoints
  const nextRankIndex = ranks.findIndex(r => r.id === currentRank.value.id) + 1
  
  if (nextRankIndex >= ranks.length) return 100
  
  const nextRankPoints = ranks[nextRankIndex].requiredPoints
  const progress = ((props.userPoints - currentRankPoints) / (nextRankPoints - currentRankPoints)) * 100
  return Math.min(progress, 100)
})
</script>

<style scoped>
.rank-container {
  background-color: #1a1a1a;
  border-radius: 12px;
  padding: 24px;
  max-width: 600px;
  color: #e8e8e8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-height: 90vh;
}

.rank-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border-bottom: 1px solid #333;
  padding-bottom: 16px;
}

.rank-header h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #e8e8e8;
}

/* Rank Atual */
.current-rank-section {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  align-items: center;
}

.rank-badge {
  flex: 1;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

.rank-mineral {
  width: 60px;
  height: 60px;
  color: currentColor;
}

.rank-badge h2 {
  margin: 0;
  font-size: 20px;
}

.rank-level {
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
}

.rank-cobre { background: linear-gradient(135deg, #B87333 0%, #8B5A2B 100%); color: white; }
.rank-bronze { background: linear-gradient(135deg, #CD7F32 0%, #8B4513 100%); color: white; }
.rank-prata { background: linear-gradient(135deg, #C0C0C0 0%, #808080 100%); color: #000; }
.rank-ouro { background: linear-gradient(135deg, #FFD700 0%, #DAA520 100%); color: #000; }
.rank-platina { background: linear-gradient(135deg, #E5E4E2 0%, #A8A9AD 100%); color: #000; }
.rank-ametista { background: linear-gradient(135deg, #9966CC 0%, #6B46C1 100%); color: white; }

.points-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.total-points,
.rank-points {
  background: #252525;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 12px;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value {
  font-size: 20px;
  font-weight: 600;
  color: #3366cc;
}

/* Progress Section */
.progress-section {
  margin-bottom: 24px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 13px;
}

.percentage {
  color: #3366cc;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #252525;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3366cc, #ff8844);
  transition: width 0.3s ease;
}

/* Ranks List */
.ranks-list {
  margin-bottom: 24px;
}

.ranks-list h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.ranks-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #252525;
  transition: background 0.2s;
}

.rank-item:hover {
  background: #2a2a2a;
}

.rank-item-active {
  background: #333;
  border: 1px solid #3366cc;
}

.rank-item-badge {
  min-width: 40px;
  width: 40px;
  height: 40px;
  text-align: center;
  padding: 0;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
}

.rank-item-badge svg {
  width: 24px;
  height: 24px;
}

.rank-cobre { color: #B87333; }
.rank-bronze { color: #CD7F32; }
.rank-prata { color: #C0C0C0; }
.rank-ouro { color: #FFD700; }
.rank-platina { color: #E5E4E2; }
.rank-ametista { color: #9966CC; }

.rank-item-info {
  flex: 1;
}

.rank-item-name {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.rank-item-points {
  margin: 2px 0 0 0;
  font-size: 12px;
  opacity: 0.6;
}

.rank-checkmark {
  color: #3366cc;
  font-weight: bold;
  font-size: 16px;
}

/* History Section */
/* Novo estilo para seção de histórico de pontuação */
.history-section {
  margin-bottom: 24px;
  background: #252525;
  padding: 16px;
  border-radius: 12px;
}

.history-section h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #1a1a1a;
  border-radius: 8px;
  align-items: flex-start;
}

.history-icon {
  width: 24px;
  height: 24px;
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3366cc;
  margin-top: 2px;
}

.history-content {
  flex: 1;
  min-width: 0;
}

.history-activity {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: #e8e8e8;
}

.history-description {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: #888;
}

.history-points {
  font-size: 14px;
  font-weight: 600;
  color: #ff8844;
  white-space: nowrap;
}

/* Stats Section */
.stats-section {
  background: #252525;
  padding: 20px;
  border-radius: 12px;
}

.stats-section h3 {
  margin: 0 0 16px 0;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-card {
  background: #1a1a1a;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;
}

.stat-label {
  font-size: 11px;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #ff8844;
}

@media (max-width: 768px) {
  .rank-container {
    padding: 16px;
  }

  .current-rank-section {
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
