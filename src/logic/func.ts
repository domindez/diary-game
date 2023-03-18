import { type UserData } from './interfaces'

export const getUserDataFromStorage = () => {
  let userData: UserData
  const storage = localStorage.getItem('diary-tfy-user')
  if (storage != null) {
    userData = JSON.parse(storage)
    return userData
  }
}
