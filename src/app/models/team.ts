import { image } from 'faker'
export class Team {
  public image: string
  constructor(public id: number, public name: string) {
    this.image = image.avatar()
  }
}
