import {Img} from "./img.model";
import {BreedInterface, QueriesInterface, TreatmentInterface, UserInterface} from "../interfaces/interfacesModel.interface";

export class Pet{
  constructor(
    public name: string,
    public birthDate: Date,
    public idUser: UserInterface,
    public sex: string,
    public sterilized: boolean,
    public color: string,
    public breed: BreedInterface,
    public type: string,
    public createDate: Date,
    public img?: Img,
    public chip?: string,
    public passport?: string,
    public chronic?: [string],
    public weight?: [number],
    public queries?: [QueriesInterface],
    public nextQueries?: [QueriesInterface],
    public treatment?: [TreatmentInterface],
    public comment?: [string],
    public active?: boolean,
    public deleteDate?: Date,
    public deleteUser?: UserInterface,
    public deleteReason?: string
  ){}
}
