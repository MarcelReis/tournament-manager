import { OpponentType } from './../../../models/match'
import { Team } from './../../../models/team'
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent implements OnInit {
  @Input() team?: OpponentType
  @Input() addScore: () => void

  constructor() {}

  ngOnInit(): void {}
}
