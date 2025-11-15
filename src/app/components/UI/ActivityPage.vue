<template>
  <div class="work-detail-container">
    <!-- Header com título e status -->
    <div class="header-section">
      <div class="title-area">
        <h2 class="work-title">{{ work?.title || "Sem título" }}</h2>
        <div class="informations-work w-full flex gap-3">
          <span class="status-badge" :class="getStatusClass(work?.status)">
            {{ work?.status || "Pendente" }}
          </span>
          <span
            class="importance-badge text-white font-bold"
            :class="getImportanceClass(work?.importance)"
          >
            {{ work?.importance }}
          </span>
        </div>
      </div>
    </div>

    <!-- Metadados do trabalho -->
    <div class="metadata-grid">
      <div class="metadata-item">
        <span class="label">👤 Enviado por</span>
        <p class="value">{{ work?.user || "Não especificado" }}</p>
      </div>
      <div class="metadata-item">
        <span class="label">🏷️ Sala</span>
        <p class="value">{{ work?.roomId || "Sem sala" }}</p>
      </div>
      <div class="metadata-item">
        <span class="label">📅 Prazo</span>
        <p class="value">{{ formatDate(work?.dueDate) || "Sem prazo" }}</p>
      </div>
      <div class="metadata-item">
        <span class="label">⏰ Criado em</span>
        <p class="value">{{ formatDate(work?.createdAt) || "-" }}</p>
      </div>
    </div>

    <!-- Descrição -->
    <div class="description-section">
      <h3 class="section-title">Descrição</h3>
      <div class="description-content">
        <p>{{ work?.description || "Nenhuma descrição fornecida." }}</p>
      </div>
    </div>

    <!-- Anexos -->
    <div class="attachments-section">
      <h3 class="section-title">Anexos</h3>

      <!-- Lista de anexos -->
      <div
        v-if="work?.attachments && work.attachments.length > 0"
        class="attachments-list"
      >
        <div
          v-for="(file, index) in work.attachments"
          :key="index"
          class="attachment-item"
        >
          <span class="file-icon">📎</span>
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatFileSize(file.size) }}</span>
          <button class="btn-download" title="Download">⬇️</button>
        </div>
      </div>

      <!-- Sem anexos -->
      <div v-else class="no-attachments">
        <p>Nenhum anexo adicionado</p>
      </div>

      <!-- Upload de anexos -->
      <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
        <input
          ref="fileInput"
          type="file"
          multiple
          @change="handleFileSelect"
          class="file-input-hidden"
        />
        <button class="btn-upload" @click="triggerFileInput">
          + Adicionar anexo
        </button>
        <p class="upload-hint">ou arraste arquivos aqui</p>
      </div>
    </div>

    <!-- Rodapé com ações -->
    <div class="footer-section">
      <button class="btn-secondary">Cancelar</button>
      <button class="btn-primary">Salvar alterações</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  work: {
    type: Object,
    required: true,
  },
});

const fileInput = ref(null);

const getStatusClass = (status) => {
  const statusMap = {
    Entregue: "status-completed",
    Pendente: "status-pending",
    "Em progresso": "status-progress",
    Atrasado: "status-overdue",
  };
  return statusMap[status] || "status-pending";
};

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR");
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const files = event.target.files;
  console.log("Arquivos selecionados:", files);
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  console.log("Arquivos arrastados:", files);
};

/* 🚀 IMPORTANTE: AQUI É A CORREÇÃO */
const getImportanceClass = (importance) => {
  if (!importance) return "importance-medium";

  // normaliza sem acentos e tudo minúsculo
  const normalized = importance
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const map = {
    urgente: "importance-urgent",
    alta: "importance-high",
    media: "importance-medium",
    baixa: "importance-low",
  };

  return map[normalized] || "importance-medium";
};
</script>
<style lang="scss">
@use "../scss/ActivityPage.scss"
</style>