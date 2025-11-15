<template>
  <div class="min-h-screen bg-[#1a1a1a] p-6 rounded-2xl">
    <div class="max-w-2xl mx-auto">

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">Criar Nova Atividade</h1>
        <p class="text-slate-400">Preencha os detalhes da atividade para os alunos</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">

        <!-- Section 1 -->
        <div class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
          <h2 class="flex items-center text-lg font-semibold text-white mb-4">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">1</span>
            Informações Básicas
          </h2>

          <div class="space-y-4">
            <!-- TÍTULO -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                Nome da Atividade *
              </label>
              <input
                v-model="form.title"
                type="text"
                placeholder="Ex: Projeto Final - Sistema de Gestão"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                required
              />
            </div>

            <!-- DESCRIÇÃO -->
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                Descrição Detalhada *
              </label>
              <textarea
                v-model="form.description"
                placeholder="Descreva os objetivos, requisitos e expectativas da atividade..."
                rows="4"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Section 2 -->
        <div class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
          <h2 class="flex items-center text-lg font-semibold text-white mb-4">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">2</span>
            Datas e Prazos
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                Data de Início *
              </label>
              <input
                v-model="form.startDate"
                type="date"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                Data de Prazo *
              </label>
              <input
                v-model="form.dueDate"
                type="date"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                required
              />
            </div>

          </div>
        </div>

        <!-- Section 3 -->
        <div class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
          <h2 class="flex items-center text-lg font-semibold text-white mb-4">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">3</span>
            Importância e Status
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                Importância *
              </label>
              <select
                v-model="form.importance"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
                required
              >
                <option value="">Selecione a importância</option>
                <option value="bonus">Bonus</option>
                <option value="baixa">Baixa Prioridade</option>
                <option value="moderada">Moderada</option>
                <option value="alta">Alta Prioridade</option>
                <option value="urgente">Urgente</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">
                Status *
              </label>
              <select
                v-model="form.status"
                class="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white"
                required
              >
                <option value="">Selecione o status</option>
                <option value="planejamento">Em Planejamento</option>
                <option value="ativa">Ativa</option>
                <option value="encerrada">Encerrada</option>
              </select>
            </div>

          </div>
        </div>

        <!-- Anexos -->
        <div class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
          <h2 class="flex items-center text-lg font-semibold text-white mb-4">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">4</span>
            Anexos (Opcional)
          </h2>

          <div
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleFileDrop"
            :class="[
              'border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer',
              isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 bg-slate-700/30'
            ]"
          >
            <p class="text-slate-300 font-medium mb-2">Arraste arquivos aqui ou clique para selecionar</p>

            <input
              type="file"
              multiple
              @change="handleFileSelect"
              class="hidden"
              ref="fileInput"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.jpg,.png"
            />

            <button
              type="button"
              @click="$refs.fileInput.click()"
              class="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Selecionar Arquivos
            </button>
          </div>

          <div v-if="files.length > 0" class="mt-4 space-y-2">
            <h3 class="text-sm font-medium text-slate-300">Arquivos Selecionados:</h3>

            <div
              v-for="(file, index) in files"
              :key="index"
              class="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg border border-slate-600"
            >
              <div class="flex items-center gap-3">
                <span class="text-blue-400">📎</span>
                <div>
                  <p class="text-sm text-white font-medium">{{ file.name }}</p>
                  <p class="text-xs text-slate-400">{{ formatFileSize(file.size) }}</p>
                </div>
              </div>

              <button
                type="button"
                @click="removeFile(index)"
                class="text-red-400 hover:text-red-300 transition"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg"
          >
            Criar Atividade
          </button>

          <button
            type="button"
            @click="handleCancel"
            class="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg"
          >
            Cancelar
          </button>
        </div>

      </form>

      <div
        v-if="showSuccess"
        class="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in"
      >
        <span>Atividade criada com sucesso!</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWorksStore } from '../../../store/WorksPinia'
import { useUserStore } from '../../../store/user'

const worksStore = useWorksStore()
const userStore = useUserStore()

const form = ref({
  title: '',
  description: '',
  startDate: '',
  dueDate: '',
  importance: '',
  status: ''
})

const files = ref([])
const isDragging = ref(false)
const showSuccess = ref(false)
const fileInput = ref(null)

const handleSubmit = () => {
  const roomId = Number(localStorage.getItem("selectedRoom"))

  console.log("🟧 FORM SALVANDO PARA A SALA:", roomId)

  const newWork = {
    roomId,
    title: form.value.title,
    description: form.value.description,
    importance: form.value.importance,
    status: form.value.status,
    dueDate: form.value.dueDate,
    createdAt: new Date().toISOString().split('T')[0],
    user: userStore.info?.name || 'Desconhecido',
    files: files.value
  }

  worksStore.addWork(newWork, roomId)

  showSuccess.value = true
  setTimeout(() => (showSuccess.value = false), 3000)

  form.value = {
    title: '',
    description: '',
    startDate: '',
    dueDate: '',
    importance: '',
    status: ''
  }
  files.value = []
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
