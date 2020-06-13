import { Match } from 'src/app/models/match'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent {
  @Input() match: Match
  @Input() addScore: (
    phaseIndex: number,
    matchIndex: number,
    teamID: number
  ) => void
  @Input() phaseIndex: number
  @Input() matchIndex: number

  constructor() {}
}
