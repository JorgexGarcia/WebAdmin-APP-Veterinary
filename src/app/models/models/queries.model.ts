import {PetInterface, ReportInterface, ServiceInterface, TreatmentInterface, UserInterface} from "../interfaces/interfacesModel.interface";


export class Queries {
  constructor(
    public id: string,
    public type: string,
    public idPet: PetInterface,
    public idUser: UserInterface,
    public description: string,
    public service: ServiceInterface,
    public tests: string,
    public startDate: Date,
    public finishDate: Date,
    public reports?: [ReportInterface],
    public firstObservation?: string,
    public treatment?: TreatmentInterface,
    public diagnostic?: string,
    public finish?: boolean,
    public active?: boolean,
    public deleteDate?: Date,
    public deleteUser?: UserInterface,
    public deleteReason?: string
  ) {
  }
}
