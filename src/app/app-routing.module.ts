import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TournamentComponent } from './tournament/tournament.component'
import { RegisterComponent } from './register/register.component'

const routes: Routes = [
  { path: 'tournament', component: TournamentComponent },
  { path: 'create', component: RegisterComponent },
  { path: '**', redirectTo: 'tournament' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
