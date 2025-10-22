<template>
  <div class="flex h-screen  text-white">
    <!-- Sidebar Resizable -->
    <div 
      class="flex-shrink-0  border-r border-[#3d3d3d] overflow-hidden"
      :style="{ width: sidebarWidth + 'px' }"
    >
      <div class="h-full overflow-y-auto">

        <div class="p-4 border-b border-[#3d3d3d]">
          <h2 class="text-lg font-semibold">Atividade</h2>
        </div>


        <div class="py-2">
          <div
            v-for="lesson in lessons"
            :key="lesson.id"
            @click="selectLesson(lesson.id)"
            :class="[
              'px-4 py-3 cursor-pointer hover:bg-[#3d3d3d] transition-colors border-l-4',
              selectedLessonId === lesson.id ? 'bg-[#3d3d3d] border-l-secondary-orange' : 'border-l-transparent'
            ]"
          >
            <div class="flex items-start gap-3">
              <div class="mt-1">
                <svg class="w-5 h-5 text-secondary-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <h3 class="font-semibold text-sm truncate">{{ lesson.student }}</h3>
                  <span class="text-xs text-gray-400 flex-shrink-0">{{ lesson.date }}</span>
                </div>
                <p class="text-xs text-secondary-orange mt-1">{{ lesson.action }}</p>
                <p class="text-xs text-secondary-blue-200 mt-1 truncate">{{ lesson.course }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div
      @mousedown="startResize"
      class="w-1 bg-[#3d3d3d] hover:bg-[#6264a7] cursor-col-resize transition-colors flex-shrink-0"
    ></div>

  
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const sidebarWidth = ref(350)
const isResizing = ref(false)
const selectedLessonId = ref(1)

const lessons = ref([
  {
    id: 1,
    student: 'ELZA STAUBER',
    action: 'Criou ativdidade',
    date: '14/05',
    course: 'SOCIO-3A-I-DESENVOLVIMENTO DE SISTEMAS - MTEC - PI-26...',
    title: 'QUESTÕES SOCIOLOGIA',
  },
  {
    id: 2,
    student: 'IURY DA SILVA',
    action: 'Criou atividade',
    date: '13/10',
    course: 'SEMB-3A-I-DESENVOLVIMENTO DE SISTEMAS - MTEC - PI-2...',
    title: 'DESENVOLVIMENTO WEB AVANÇADO',
  
  },
  {
    id: 3,
    student: 'ARTHUR SANTOS BARBOSA',
    action: 'Criou atividade',
    date: '07/10',
    course: 'LPL-3A-I-DESENVOLVIMENTO DE SISTE... › RODA DE LEIT...',
    title: 'ANÁLISE DE SISTEMAS',
  },
  {
    id: 4,
    student: 'ANDREIA DA CONCEICAO LENTINI KIAN',
    action: 'Criou atividade',
    date: '03/10',
    course: 'BIO-3A-I-DESENVOLVIMENTO DE SISTEMAS - MTEC - PI-26...',
    title: 'BANCO DE DADOS',
  },
  {
    id: 5,
    student: 'IURY DA SILVA',
    action: 'atualizou uma tarefa',
    date: '30/09',
    course: 'QITS-3A-GB-I-DESENVOLVIMENTO DE SISTEMAS - MTEC - PL...',
    title: 'TESTES DE SOFTWARE',
  }
])

const selectedLesson = computed(() => {
  return lessons.value.find(l => l.id === selectedLessonId.value) || lessons.value[0]
})

const selectLesson = (id) => {
  selectedLessonId.value = id
}

const startResize = (e) => {
  isResizing.value = true
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  e.preventDefault()
}

const handleResize = (e) => {
  if (!isResizing.value) return
  
  const newWidth = e.clientX
  if (newWidth >= 250 && newWidth <= 600) {
    sidebarWidth.value = newWidth
  }
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
}
</script>