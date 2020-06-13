import { Router } from '@angular/router'
import { gameStared } from '../tournament/store/tournament.action'
import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { AppState } from '../store/app.reducer'
import { Store } from '@ngrx/store'

import { company } from 'faker'

import { Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

import { Team } from 'src/app/models/team'

import { addTeam, removeTeam } from './store/register.actions'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  teams: Team[]
  subscription: Subscription

  constructor(private store: Store<AppState>, private router: Router) {}

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ])

  addTeam = (name: string) => {
    this.store.dispatch(addTeam({ name }))
  }

  removeTeam = (id: number) => {
    this.store.dispatch(removeTeam({ id }))
  }

  startGame() {
    this.store.dispatch(gameStared({ ids: this.teams.map((team) => team.id) }))
    this.router.navigate(['/tournament'])
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('register')
      .pipe(map((state) => state.teams))
      .subscribe((teams: Team[]) => {
        this.teams = teams
      })
  }
}
