export type OpponentType = { id: number; score: number } | null
export class Match {
  constructor(public teams: OpponentType[]) {}
}
