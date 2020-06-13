import { OpponentType } from '../../../models/match'
import { Team } from '../../../models/team'
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'

@Component({
  selector: 'app-opponent',
  templateUrl: './opponent.component.html',
  styleUrls: ['./opponent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpponentComponent implements OnInit {
  @Input() team?: OpponentType
  @Input() addScore: () => void

  constructor() {}

  ngOnInit(): void {}
}
