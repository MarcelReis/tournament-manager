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
  @Input() addScore: (teamID: number) => void

  subscription: Subscription
  teams: Team[]

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select('register')
      .pipe(map((state) => state.teams))
      .subscribe((teams: Team[]) => {
        this.teams = teams.filter((team) =>
          this.match.teams.find((opponent) => opponent?.id === team.id)
        )
      })
  }
}
