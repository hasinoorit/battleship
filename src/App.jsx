import { useGame } from "./hooks/useGame"
import missImg from "./assets/Miss.png"
import missSmall from "./assets/Miss small.png"
import hitImg from "./assets/Hit.png"
import hitSmall from "./assets/Hit small.png"
import carrier from "./assets/carrier.png"
import battleship from "./assets/battleship.png"
import cruiser from "./assets/cruiser.png"
import submarine from "./assets/submarine.png"
import destroyer from "./assets/destroyer.png"

const shipPhoto = { carrier, battleship, cruiser, submarine, destroyer }

function App() {
  const layout = [
    {
      ship: "carrier",
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      ship: "battleship",
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      ship: "cruiser",
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      ship: "submarine",
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      ship: "destroyer",
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ]
  const { boardStat, handleShoot, numbers, isGameOver, ships } = useGame(layout)
  return (
    <div className="App">
      <header>Battleship</header>
      {isGameOver && <h1>Game Over</h1>}
      <main>
        <div className="board">
          {numbers.map((_, index) => (
            <div className="row" key={`row-${index}`}>
              {numbers.map((_, index2) => {
                const colPos = index + "-" + index2
                const stat = boardStat[colPos]
                return (
                  <div
                    className="tile"
                    onClick={handleShoot(colPos)}
                    key={`col-${colPos}`}
                  >
                    {stat === 0 ? null : (
                      <img className="tile-img" src={stat === 1 ? hitImg : missImg} />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="stats">
          <div className="player-stat">
            <div className="player-1">
              <h1>00</h1>
              <hr />
              <h3>player 1</h3>
            </div>
            <div className="player-2">
              <h1>00</h1>
              <hr />
              <h3>player 1</h3>
            </div>
          </div>
          <div className="ship-stat">
            {ships.map((ship) => (
              <div key={ship.ship}>
                <img className="shipPhoto" src={shipPhoto[ship.ship]} alt={ship.ship} />
                {ship.tiles.map((tile, index) => (
                  <img src={tile ? hitSmall : missSmall} key={index} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
