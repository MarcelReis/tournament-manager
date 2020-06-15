import { Team } from 'src/app/models/team'
import { OpponentType } from '../../../../models/match'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.scss'],
})
export class OpponentComponent {
  @Input() opponent?: OpponentType & Team
  @Input() addScore: () => void
  @Input() bestOf: number
}
