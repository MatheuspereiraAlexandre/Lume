<template>
  <div class="works-wrapper rounded p-4 text-white" style="height: 70dvh">
    <h2 class="mb-4">💼 Trabalhos da Sala {{ room?.name || room?.id }}</h2>

    <div
      v-if="filteredWorks.length > 0"
      class="works-list overflow-y-auto"
      style="max-height: 55dvh;"
    >
      <div
        v-for="work in filteredWorks"
        :key="work.id"
        class="work-item bg-[#2a2a2a] p-3 rounded mb-2 cursor-pointer"
        @click="openDialog(work)"
      >
        <h3 class="text-lg font-semibold">{{ work.title }}</h3>
        <p class="text-gray-300 text-sm mb-1">{{ work.description }}</p>
        <p class="text-gray-400 text-xs">📅 Enviado por {{ work.user }}</p>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center mt-10">
      Nenhum trabalho enviado ainda.
    </div>

    <div class="add" v-if="userInformation.cargo === 'admin'">
      <button 
        class="Add-button bg-secondary-blue-200 absolute bottom-20 right-15 hover:bg-secondary-blue-300 cursor-pointer transition-colors"
        style="width: 5dvw; height: 5dvh; border-radius: 5px;"
        @click="openAdd()"
      >
        +
      </button>
    </div>

    <Dialog
      v-model:visible="dialogVisible"
      modal
      :closable="true"
      :dismissableMask="true"
      :breakpoints="breakpoints"
      :style="dialogStyle"
    >
      <ActivityPage v-if="selectedWork" :work="selectedWork" />
    </Dialog>

    <Dialog
      v-model:visible="addDialogVisible"
      modal
      :closable="true"
      :dismissableMask="true"
      :breakpoints="breakpoints"
      :style="dialogStyle"
    >
      <ActivityForm />
    </Dialog>

  </div>
</template>

<script setup>
import { useUserStore } from '../../../store/user'
import { useWorksStore } from '../../../store/WorksPinia'
import { ref, computed } from "vue"
import Dialog from "primevue/dialog"
import ActivityPage from "./ActivityPage.vue"
import ActivityForm from "./ActivityForm.vue"

const props = defineProps({
  room: { type: Object, required: false }
})

localStorage.setItem("selectedRoom", props.room?.id || 0)

const userInformation = useUserStore().info
const worksStore = useWorksStore()

console.log("🟦 WORKS STORE:", worksStore.works)
console.log("🟧 SALA ATUAL:", props.room)

const dialogVisible = ref(false)
const addDialogVisible = ref(false)
const selectedWork = ref(null)

function openAdd() {
  console.log("➕ Abrindo formulário para a sala:", props.room?.id)
  addDialogVisible.value = true
}

const filteredWorks = computed(() => {
  const list = worksStore.works.filter(w => w.roomId === props.room?.id)

  console.log("🔵 FILTRANDO WORKS:")
  console.log("  ➥ Sala:", props.room?.id)
  console.log("  ➥ Works:", worksStore.works)
  console.log("  ➥ Filtrados:", list)

  return list
})

function openDialog(work) {
  selectedWork.value = work
  dialogVisible.value = true
}

const dialogStyle = { width: "50vw", background: "#141414", color: "#fff" }
const breakpoints = { "960px": "80vw", "640px": "95vw" }
</script>

<style lang="scss" scoped>
.work-item {
  transition: 0.2s ease;
  &:hover {
    background: #353535;
  }
}
</style>
