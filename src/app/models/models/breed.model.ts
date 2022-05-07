import {UserInterface} from "../interfaces/interfacesModel.interface";

export class Breed{
  constructor(
    public name: string,
    public type: string,
    public problems?: [string],
    public features?: [string],
    public active?: boolean,
    public deleteDate?: Date,
    public deleteUser?: UserInterface,
    public deleteReason?: string
  ) {
  }
}
