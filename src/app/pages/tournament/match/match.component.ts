import { OpponentType } from './../../../models/match'
import { Match } from 'src/app/models/match'
import { Component, Input, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AppState } from 'src/app/store/app.reducer'
import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators'
import { Team } from 'src/app/models/team'

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  @Input() match: Match
  @Input() bestOf: number
  @Input() addScore: (teamID: number) => void

  opponents: Team[] & OpponentType[]
  subscription: Subscription
  teams: Team[]

  constructor(private store: Store<AppState>) {
    this.opponents = []
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('register')
      .pipe(map((state) => state.teams))
      .subscribe((teams: Team[]) => {
        this.opponents = this.match.teams.map((matchOpponent) => {
          if (!matchOpponent || !matchOpponent.id) {
            return { id: 0, score: 0, name: '', image: '' }
          }
          return {
            ...matchOpponent,
            ...teams.find((matchTeam) => matchOpponent.id === matchTeam.id),
          }
        })
      })
  }
}
