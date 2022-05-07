import {Img} from "./img.model";
import {UserInterface} from "../interfaces/interfacesModel.interface";


export class Product{
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public quantity: number,
    public img?: Img,
    public active?: boolean,
    public deleteDate?: Date,
    public deleteUser?: UserInterface,
    public deleteReason?:string
  ) {
  }
}
