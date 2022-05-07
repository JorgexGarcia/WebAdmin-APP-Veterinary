import { Img } from './img.model';
import {PetInterface,
  PromotionInterface,
  UserInterface} from "../interfaces/interfacesModel.interface";

export class User {

  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public rol: string,
    public birthDate: Date,
    public dni: string,
    public phone: [string],
    public province: string,
    public city: string,
    public address: string,
    public img?: Img,
    public listPets?: [PetInterface],
    public comment?: [string],
    public promotions?: [PromotionInterface],
    public active?: boolean,
    public deleteDate?: Date,
    public deleteUser?: UserInterface,
    public deleteReason?: string
  ) {
  }
}
