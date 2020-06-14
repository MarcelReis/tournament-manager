import { addScore } from './store/tournament.action'
import { Component, OnInit, DoCheck } from '@angular/core'
import { Subscription } from 'rxjs'
import { Match } from '../models/match'
import { map } from 'rxjs/operators'
import { AppState } from '../store/app.reducer'
import { Store } from '@ngrx/store'

@Component({
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent implements OnInit {
  tournament: Match[][]
  subscription: Subscription
  bestOf: number

  constructor(private store: Store<AppState>) {}

  addScore = (phaseIndex: number, matchIndex: number) => {
    return (teamId: number) =>
      this.store.dispatch(addScore({ phaseIndex, matchIndex, teamId }))
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('tournament')
      .pipe(map((state) => ({ matches: state.matches, bestOf: state.bestOf })))
      .subscribe(({ matches, bestOf }) => {
        this.tournament = matches
        this.bestOf = bestOf
      })
  }
}
