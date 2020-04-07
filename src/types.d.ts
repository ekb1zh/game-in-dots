// Store
export type State = Partial<{
  difficulties: Difficulties
  currentMode: string
  playerName: string
  isPlaying: boolean
  winners: Array<Winner>
}>

export type Difficulties = {
  [mode: string]: {
    field: number
    delay: number
  }
}

export type Winner = {
  winner: string
  date: string
}

export type Coordinate = [number, number];

export type Grid = Array<Array<string | null>>;

export type Score = [number, number]; // [player, computer]
