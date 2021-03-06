import { Stage } from '../constants'

export type State = {
  difficulties: Difficulties | null
  currentMode: string | null
  playerName: string | null
  winners: Array<Winner> | null
  score: Score
  stage: Stage
}

export type Difficulties = {
  [mode: string]: {
    field: number
    delay: number
  }
}

export type Winner = {
  id: string
  winner: string
  date: string
}

export type Coordinate = [number, number];

export type Table = Array<Array<string>>;

export type Score = [number, number]; // [player, computer]
