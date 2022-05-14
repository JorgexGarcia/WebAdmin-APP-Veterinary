import {UserInterface} from "../interfaces/interfacesModel.interface";

export class Service {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public active?: boolean,
    public deleteDate?: Date,
    public deleteUser?: UserInterface,
    public deleteReason?: string
  ) {}

}
