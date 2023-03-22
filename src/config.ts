const isDev = process.env.NODE_ENV === 'development'
const API_BASE_URL = isDev ? 'https://backend-diary-game-production.up.railway.app' : 'https://backend-diary-game-production.up.railway.app'

export default API_BASE_URL
