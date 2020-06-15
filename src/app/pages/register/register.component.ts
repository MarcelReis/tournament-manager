import { Router } from '@angular/router'
import { gameStarted } from '../../pages/tournament/store/tournament.action'
import { Component, OnInit } from '@angular/core'

import { AppState } from '../../store/app.reducer'
import { Store } from '@ngrx/store'

import { company } from 'faker'

import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

import { Team } from 'src/app/models/team'

import {
  addTeam,
  removeTeam,
  setTeamsNumber,
  setBestOf,
  toggleShuffle,
} from './store/register.actions'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  gameConfig: { shuffle: boolean; bestOf: number; teams: number }
  teams: Team[]
  subscription: Subscription

  constructor(private store: Store<AppState>, private router: Router) {}

  addTeam = (name: string) => {
    this.store.dispatch(addTeam({ name }))
  }

  removeTeam = (id: number) => {
    this.store.dispatch(removeTeam({ id }))
  }

  addRandomTeams = () => {
    for (let i = this.teams.length; i < this.gameConfig.teams; i++) {
      this.store.dispatch(addTeam({ name: company.companyName() }))
    }
  }

  setTeamsConfig = (teams: 2 | 4 | 8 | 16) => {
    this.store.dispatch(setTeamsNumber({ teams }))
  }

  setBestOfConfig = (bestOf: 1 | 3 | 5) => {
    this.store.dispatch(setBestOf({ bestOf }))
  }

  toggleShuffleConfig = () => {
    this.store.dispatch(toggleShuffle())
  }

  startGame() {
    this.store.dispatch(
      gameStarted({
        ids: this.teams.map((team) => team.id),
        bestOf: this.gameConfig.bestOf,
        shuffle: false,
      })
    )
    this.router.navigate(['/tournament'])
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('register')
      .pipe(
        map((state) => ({ teams: state.teams, gameConfig: state.gameConfig }))
      )
      .subscribe(({ teams, gameConfig }) => {
        this.teams = teams
        this.gameConfig = gameConfig
      })
  }
}
