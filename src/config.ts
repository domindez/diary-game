const isDev = process.env.NODE_ENV === 'development'

export const API_BASE_URL = isDev ? 'http://localhost:4000' : 'https://backend-diary-game-production.up.railway.app'
export const userStorage = 'diary-tfy-user'
export const gameStorage = 'diary-tfy-game'
