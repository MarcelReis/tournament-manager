import { Component, OnInit, Input } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { company } from 'faker'

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnInit {
  @Input() private addTeam: (team: string) => void
  @Input() disabled: boolean
  @Input() fillTeams: () => void

  teamName: string

  constructor() {}

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(50),
  ])

  submit() {
    this.addTeam(this.teamName)
    this.teamName = company.companyName()
  }

  ngOnInit(): void {
    this.teamName = company.companyName()
  }
}
