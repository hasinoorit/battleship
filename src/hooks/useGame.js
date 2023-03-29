import { useCallback, useState } from "react"
const boardMap = () => {
  const map = {}
  for (let index = 0; index < 10; index++) {
    for (let index2 = 0; index2 < 10; index2++) {
      map[`${index}-${index2}`] = 0
    }
  }
  return map
}

export const useGame = (layout) => {
  const _layout = layout.map((ship) => {
    ship.positions = ship.positions.map((v) => v[0] + "-" + v[1])
    return ship
  })
  const [boardStat, setBoardStat] = useState(boardMap())
  const numbers = Array.from({ length: 10 })
  const shipTilesStatus = (ship) => {
    return ship.positions.map((position) => {
      return !!boardStat[position]
    })
  }
  const getShip = (colPos) => {
    const ship = _layout.find((v) => v.positions.includes(colPos))
    return ship
  }
  const handleShoot = useCallback((colPos) => {
    return () => {
      setBoardStat((prevValue) => ({ ...prevValue, [colPos]: getShip(colPos) ? 1 : 2 }))
    }
  }, [])
  const isGameOver = (() => {
    const allShipTiles = _layout.map(shipTilesStatus).flat()
    return allShipTiles.length === allShipTiles.filter((v) => v === true).length
  })()
  const ships = _layout.map((ship) => {
    return { ship: ship.ship, tiles: shipTilesStatus(ship) }
  })
  return { handleShoot, boardStat, numbers, isGameOver, ships }
}
