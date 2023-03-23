import { userStorage } from '../config'
import { type UserData } from './interfaces'

export const getUserDataFromStorage = () => {
  let userData: UserData
  const storage = localStorage.getItem(userStorage)
  if (storage != null) {
    userData = JSON.parse(storage)
    return userData
  }
}
