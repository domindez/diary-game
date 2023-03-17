import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export default function printBoardGame (gameStatus: any, clickCell: any) {
  const alto = 12
  const ancho = 7
  const Y = 0; const X = 1
  const tablero: JSX.Element[][] = []
  let playerIsHere
  let esMuerte
  let esBotella
  let trail
  let up, down, left, right

  for (let y = 0; y < alto; y++) {
    tablero[y] = []
    for (let x = 0; x < ancho; x++) {
      const coordenadasCelda = [y, x]

      up = getUp(y, x)
      down = getDown(y, x)
      left = getLeft(y, x)
      right = getRight(y, x)
      trail = getTrail(y, x)
      gameStatus.playerPos[Y] === y && gameStatus.playerPos[X] === x ? playerIsHere = true : playerIsHere = false
      gameStatus.bottlePos[Y] === y && gameStatus.bottlePos[X] === x ? esBotella = true : esBotella = false
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      gameStatus.justDeath && gameStatus.clickedCell[Y] === y && gameStatus.clickedCell[X] === x ? esMuerte = true : esMuerte = false

      tablero[y][x] =
			<button
			key={x}
        className={playerIsHere ? 'cell green' : trail ? 'cell green' : esMuerte ? 'cell red' : esBotella ? 'cell yellow' : 'cell'}
        onClick={() => clickCell(coordenadasCelda)}>
        {up && !esMuerte && <FontAwesomeIcon className='game-icon arrow' icon={faCaretUp} />}
        {down && !esMuerte && <FontAwesomeIcon className='game-icon arrow' icon={faCaretDown} />}
        {left && !esMuerte && <FontAwesomeIcon className='game-icon arrow' icon={faCaretLeft} />}
        {right && !esMuerte && <FontAwesomeIcon className='game-icon arrow' icon={faCaretRight} />}
        {playerIsHere && <img className='player' src={require('../img/player.png')} alt='player' /> }
        {esMuerte && <img className='stop' src={require('../img/stop.png')} alt='stop' />}
        {esBotella && <img className='beer' src={require('../img/beer.png')} alt='bottle' />}
      </button>
    }

    function getUp (y: number, x: number) {
      let up = false
      if ((gameStatus.initialPos[Y] === y + 1 && gameStatus.initialPos[X] === x) &&
        (gameStatus.playerPos[X] === gameStatus.initialPos[X] && gameStatus.playerPos[Y] === gameStatus.initialPos[Y])) up = true
      return up
    }

    function getDown (y: number, x: number) {
      let down = false
      if ((gameStatus.initialPos[Y] === y - 1 && gameStatus.initialPos[X] === x) &&
        (gameStatus.playerPos[X] === gameStatus.initialPos[X] && gameStatus.playerPos[Y] === gameStatus.initialPos[Y])) down = true
      return down
    }

    function getLeft (y: number, x: number) {
      let left = false
      if ((gameStatus.initialPos[Y] === y && gameStatus.initialPos[X] === x + 1) &&
        (gameStatus.playerPos[X] === gameStatus.initialPos[X] && gameStatus.playerPos[Y] === gameStatus.initialPos[Y])) left = true
      return left
    }

    function getRight (y: number, x: number) {
      let right = false
      if ((gameStatus.initialPos[Y] === y && gameStatus.initialPos[X] === x - 1) &&
        (gameStatus.playerPos[X] === gameStatus.initialPos[X] && gameStatus.playerPos[Y] === gameStatus.initialPos[Y])) right = true
      return right
    }

    function getTrail (y: number, x: number) {
      let trail = false
      gameStatus.trail.forEach((element: number[]) => {
        if (element[Y] === y && element[X] === x) { trail = true }
      })
      return trail
    }
  }
  return tablero
}
