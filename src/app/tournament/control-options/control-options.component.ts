import { Component, ChangeDetectionStrategy, Input } from '@angular/core'

@Component({
  selector: 'app-control-options',
  templateUrl: './control-options.component.html',
  styleUrls: ['./control-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlOptionsComponent {
  @Input() resetGame: () => void
}
