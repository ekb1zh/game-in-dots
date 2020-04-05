// Store
export type State = Partial<{
  difficulties: Difficulties
  currentDifficulty: string
  playerName: string
  isPlaying: boolean
  message: string
  squares: Array<Row>
  winners: Array<Winner>
}>

export type Difficulties = {
  [mode: string]: {
    field: number
    delay: number
  }
}

export type Row = {
  filled: Array<Color>
  unfilled: Array<Array<number>>
}

export type Color = 'white' | 'blue' | 'green' | 'red';

export type Winner = {
  id: number
  winner: string
  date: string
}