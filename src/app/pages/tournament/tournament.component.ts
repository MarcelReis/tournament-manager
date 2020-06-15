import {
  addScore,
  resetTournament,
  clearTournament,
} from './store/tournament.action'
import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Match } from '../../models/match'
import { map } from 'rxjs/operators'
import { AppState } from '../../store/app.reducer'
import { Store } from '@ngrx/store'
import { CurrentState } from './store/tournament.reducer'

@Component({
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
})
export class TournamentComponent implements OnInit {
  tournament: Match[][]
  subscription: Subscription
  bestOf: number
  currentState: CurrentState

  constructor(private store: Store<AppState>) {}

  addScore = (phaseIndex: number, matchIndex: number) => {
    return (teamId: number) =>
      this.store.dispatch(addScore({ phaseIndex, matchIndex, teamId }))
  }

  clearTournament = () => this.store.dispatch(clearTournament())

  resetGame = () => this.store.dispatch(resetTournament())

  ngOnInit(): void {
    this.subscription = this.store
      .select('tournament')
      .pipe(
        map((state) => ({
          matches: state.matches,
          bestOf: state.bestOf,
          curretState: state.currentState,
        }))
      )
      .subscribe(({ matches, bestOf, curretState }) => {
        this.tournament = matches
        this.bestOf = bestOf
        this.currentState = curretState
      })
  }
}
