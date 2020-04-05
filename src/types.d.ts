// Store
export type State = Partial<{
  difficulty: Difficulty
  playerName: string
  isPlaying: boolean
  message: string
  squares: Array<Row>
  winners: Array<Winner>
}>

export type Difficulty = {
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



// Actions
export type ActionToPayload = {
  SET_DIFFICULTY: Difficulty
  SET_PLAYER_NAME: string
  SET_IS_PLAYING: boolean
  SET_MESSAGE: string
  SET_SQUARES: Array<Row>
  SET_WINNERS: Array<Winner>
}

export type Action<T extends keyof ActionToPayload = any> = {
  type: T
  payload: ActionToPayload[T]
}