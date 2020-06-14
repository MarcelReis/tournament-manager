export type OpponentType = {
  id: number
  score: number
  winner?: boolean
} | null
export class Match {
  constructor(public teams: OpponentType[], public ended?: boolean) {}
}
