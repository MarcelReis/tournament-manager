import { Component, Input } from '@angular/core'

interface TeamsConfig {
  value: number
  viewValue: string
}
interface BestOfConfig {
  value: number
  viewValue: string
}

@Component({
  selector: 'app-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.scss'],
})
export class TournamentFormComponent {
  @Input() teamsAmount: number
  @Input() setTeamsAmout: (teams: number) => void
  public teamsConfig: TeamsConfig[]

  @Input() bestOf: number
  @Input() setBestOf: (bestOf: number) => void
  public bestOfConfig: BestOfConfig[]

  @Input() shuffle: boolean
  @Input() toggleShuffle: () => void

  constructor() {
    this.teamsConfig = [
      { value: 2, viewValue: '2 - Finals' },
      { value: 4, viewValue: '4 - Semifinals' },
      { value: 8, viewValue: '8 - Quarterfinals' },
      { value: 16, viewValue: '16 - Eighth-finals' },
    ]
    this.bestOfConfig = [
      { value: 1, viewValue: '1 - Single Match' },
      { value: 3, viewValue: '3 - Best of three' },
      { value: 5, viewValue: '5 - Best of five' },
    ]
  }

  selectTeamConfigHandler({ value }) {
    this.setTeamsAmout(value)
  }

  selectBestOfHandler({ value }) {
    this.setBestOf(value)
  }

  toggleShuffleHandler() {
    this.toggleShuffle()
  }
}
