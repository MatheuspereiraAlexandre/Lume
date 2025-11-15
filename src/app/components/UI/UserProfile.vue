<template>
  <div class="min-h-screen p-4" style="background-color: #1a1a1a">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div style="width: 120px"></div>
    </div>

    <!-- Main Content -->
    <div class="max-w-2xl mx-auto">
      <!-- Avatar Section -->
      <div class="text-center mb-8">
        <div
          class="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 cursor-pointer group"
          style="background-color: #1a1a1a; border-color: #2a2a2a"
          @click="triggerFileInput"
        >
          <img
            v-if="profileData.avatar"
            :src="profileData.avatar"
            alt="Avatar"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center"
            style="color: #888; font-size: 3rem"
          >
            👤
          </div>
          <div
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span style="color: #fff; font-size: 1.5rem">📷</span>
          </div>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleAvatarUpload"
        />
        <p class="text-sm" style="color: #888">Clique para alterar foto</p>
      </div>

      <!-- Form Section -->
      <div class="space-y-6">
        <!-- Row 1: Nome e Email -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2" style="color: #ffffff">
              Nome Completo
            </label>
            <input
              v-model="profileData.fullName"
              type="text"
              placeholder="Seu nome"
              class="w-full px-4 py-3 rounded-lg border-2 transition-all"
              style="background-color: #1a1a1a; border-color: #2a2a2a; color: #ffffff"
              @focus="$event.target.style.borderColor = '#3366cc'"
              @blur="$event.target.style.borderColor = '#2a2a2a'"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2" style="color: #ffffff">
              Email
            </label>
            <input
              v-model="profileData.email"
              type="email"
              placeholder="seu.email@example.com"
              class="w-full px-4 py-3 rounded-lg border-2 transition-all"
              style="background-color: #1a1a1a; border-color: #2a2a2a; color: #ffffff"
              @focus="$event.target.style.borderColor = '#3366cc'"
              @blur="$event.target.style.borderColor = '#2a2a2a'"
            />
          </div>
        </div>

        <!-- Row 2: Cargo e Departamento -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2" style="color: #ffffff">
              Cargo / Função
            </label>
            <input
              v-model="profileData.position"
              type="text"
              placeholder="Ex: Professor de Matemática"
              class="w-full px-4 py-3 rounded-lg border-2 transition-all"
              style="background-color: #1a1a1a; border-color: #2a2a2a; color: #ffffff"
              @focus="$event.target.style.borderColor = '#3366cc'"
              @blur="$event.target.style.borderColor = '#2a2a2a'"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2" style="color: #ffffff">
              Departamento
            </label>
            <select
              v-model="profileData.department"
              class="w-full px-4 py-3 rounded-lg border-2 transition-all"
              style="background-color: #1a1a1a; border-color: #2a2a2a; color: #ffffff"
              @focus="$event.target.style.borderColor = '#3366cc'"
              @blur="$event.target.style.borderColor = '#2a2a2a'"
            >
              <option value="">Selecione um departamento</option>
              <option value="matematica">Matemática</option>
              <option value="portugues">Português</option>
              <option value="ciencias">Ciências</option>
              <option value="historia">História</option>
              <option value="educacao-fisica">Educação Física</option>
              <option value="artes">Artes</option>
            </select>
          </div>
        </div>

        <!-- Row 3: Telefone e Telefone Celular -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2" style="color: #ffffff">
              Telefone
            </label>
            <input
              v-model="profileData.phone"
              type="tel"
              placeholder="(11) 1234-5678"
              class="w-full px-4 py-3 rounded-lg border-2 transition-all"
              style="background-color: #1a1a1a; border-color: #2a2a2a; color: #ffffff"
              @focus="$event.target.style.borderColor = '#3366cc'"
              @blur="$event.target.style.borderColor = '#2a2a2a'"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2" style="color: #ffffff">
              Celular
            </label>
            <input
              v-model="profileData.mobile"
              type="tel"
              placeholder="(11) 99999-9999"
              class="w-full px-4 py-3 rounded-lg border-2 transition-all"
              style="background-color: #1a1a1a; border-color: #2a2a2a; color: #ffffff"
              @focus="$event.target.style.borderColor = '#3366cc'"
              @blur="$event.target.style.borderColor = '#2a2a2a'"
            />
          </div>
        </div>

        <!-- Bio -->
        <div>
          <label class="block text-sm font-medium mb-2" style="color: #ffffff">
            Sobre Você (Bio)
          </label>
          <textarea
            v-model="profileData.bio"
            placeholder="Conte um pouco sobre você..."
            rows="4"
            class="w-full px-4 py-3 rounded-lg border-2 transition-all resize-none"
            style="background-color: #1a1a1a; border-color: #2a2a2a; color: #ffffff"
            @focus="$event.target.style.borderColor = '#3366cc'"
            @blur="$event.target.style.borderColor = '#2a2a2a'"
          ></textarea>
        </div>

        <!-- Especialidades -->
        <div>
          <label class="block text-sm font-medium mb-2" style="color: #ffffff">
            Especialidades
          </label>
          <input
            v-model="profileData.specialties"
            type="text"
            placeholder="Separe por vírgula (Ex: Álgebra, Geometria, Cálculo)"
            class="w-full px-4 py-3 rounded-lg border-2 transition-all"
            style="background-color: #1a1a1a; border-color: #2a2a2a; color: #ffffff"
            @focus="$event.target.style.borderColor = '#3366cc'"
            @blur="$event.target.style.borderColor = '#2a2a2a'"
          />
        </div>

        <!-- Preferências de Notificação -->
        <div class="p-4 rounded-lg" style="background-color: #1a1a1a; border: 1px solid #2a2a2a">
          <h3 class="text-lg font-semibold mb-4" style="color: #ffffff">
            Preferências de Notificação
          </h3>
          <div class="space-y-3">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="profileData.notifications.email"
                type="checkbox"
                class="w-4 h-4 rounded"
              />
              <span class="ml-3" style="color: #ffffff">Notificações por email</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                v-model="profileData.notifications.sms"
                type="checkbox"
                class="w-4 h-4 rounded"
              />
              <span class="ml-3" style="color: #ffffff">Notificações por SMS</span>
            </label>
            <label class="flex items-center cursor-pointer">
              <input
                v-model="profileData.notifications.push"
                type="checkbox"
                class="w-4 h-4 rounded"
              />
              <span class="ml-3" style="color: #ffffff">Notificações push</span>
            </label>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 pt-4">
          <button
            @click="saveProfile"
            class="flex-1 px-6 py-3 rounded-lg font-medium transition-all text-white"
            style="background-color: #3366cc"
          >
            Salvar Alterações
          </button>
          <button
            @click="cancelEdit"
            class="flex-1 px-6 py-3 rounded-lg font-medium transition-all"
            style="background-color: #2a2a2a; color: #ffffff"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white transition-opacity"
      style="background-color: #ff8844; color: #fff"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fileInput = ref(null);
const showToast = ref(false);
const toastMessage = ref("");

const profileData = ref({
  fullName: "Magnoneves",
  email: "Magnoneves878@gmail.com",
  position: "Professor de Matemática",
  department: "matematica",
  phone: "(11) 1234-5678",
  mobile: "(11) 99999-9999",
  bio: "Professor dedicado com 10 anos de experiência em ensino de matemática.",
  specialties: "Álgebra, Geometria, Cálculo",
  avatar: null,
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
});

function triggerFileInput() {
  fileInput.value?.click();
}

function handleAvatarUpload(event) {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileData.value.avatar = e.target?.result;
    };
    reader.readAsDataURL(file);
  }
}

function saveProfile() {
  console.log("Perfil salvo:", profileData.value);
  toastMessage.value = "Perfil atualizado com sucesso!";
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
}

function cancelEdit() {
  console.log("Edição cancelada");
  goBack();
}

function goBack() {
  window.history.back();
}
</script>

<style scoped lang="scss">
input[type="checkbox"] {
  accent-color: #3366cc;
}

select option {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>
