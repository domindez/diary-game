// import axios from 'axios'
// import { type GameStatus } from './interfaces'

// export let game1: GameStatus

// export async function getNewGame () {
//   try {
//     const response = await axios.get('http://localhost:4000/api/onload')
//     console.log(response.data)
//     game1 = response.data
//   } catch (error) {
//     console.error(error)
//   }
// }
const defaultInitialPos = [11, 6]
const bottlePos = [3, 5]

export const game1 = {
  gameReady: true,
  gameID: 1,
  initialPos: defaultInitialPos,
  playerPos: defaultInitialPos,
  bottlePos: bottlePos,
  trail: [defaultInitialPos],
  path: [defaultInitialPos, bottlePos, [5, 0], [4, 0], [3, 0], [6, 0], [6, 1], [7, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [4, 5], [10, 6]],
  justDeath: false,
  canMove: true,
  clickedCell: [],
  isWin: false,
  lives: 10,
  userBottles: 0
}
