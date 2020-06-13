import { OpponentType } from '../../../models/match'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.scss'],
})
export class OpponentComponent {
  @Input() team?: OpponentType
  @Input() addScore: () => void
}
