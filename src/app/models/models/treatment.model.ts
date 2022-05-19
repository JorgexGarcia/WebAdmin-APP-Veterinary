import {PetInterface, UserInterface} from "../interfaces/interfacesModel.interface";

export class Treatment {
  constructor(
    public id: string,
    public startDate: Date,
    public description: string,
    public idPet: PetInterface,
    public idUser: UserInterface,
    public name: string,
    public finishDate?: Date,
    public active?: boolean,
    public deleteDate?: Date,
    public deleteUser?: UserInterface,
    public deleteReason?: string
  ) {}

}
