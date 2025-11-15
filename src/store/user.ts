import { defineStore } from 'pinia'
import { userInformation } from '../Types/user-information'

export const useUserStore = defineStore('user', {
  state: () => ({
    info: userInformation
  })
})