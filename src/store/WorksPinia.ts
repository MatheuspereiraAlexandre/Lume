import { defineStore } from 'pinia'
import { works as defaultWorks } from '../Types/WorksInformations'
import { Work } from "../Types/WorksInformations"

export const useWorksStore = defineStore('works', {
  state: () => ({
    works: JSON.parse(localStorage.getItem('works') || 'null') || defaultWorks
  }),

  actions: {
    addWork(work: Work, roomId: number) {
      console.log("➡️ ADDWORK RECEBIDO:", work, "ROOM:", roomId)

      // Corrige roomId
      work.roomId = roomId

      // Gera ID automático
      work.id = this.works.length > 0
        ? this.works[this.works.length - 1].id + 1
        : 1

      this.works.push(work)
      localStorage.setItem('works', JSON.stringify(this.works))

      console.log("✅ WORK ADICIONADO:", work)
      console.log("📦 NOVA LISTA:", this.works)
    },

    clearAll() {
      this.works = []
      localStorage.setItem('works', '[]')
    }
  }
})
