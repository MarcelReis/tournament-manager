import { Component, Input } from '@angular/core'
import { Team } from 'src/app/models/team'

@Component({
  selector: 'app-opponent-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent {
  @Input() teams: Team[]
  @Input() removeTeam: (id: number) => void

  deleteTeam(id: number) {
    this.removeTeam(id)
  }
}
