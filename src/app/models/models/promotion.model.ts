import {Img} from "./img.model";
import {UserInterface} from "../interfaces/interfacesModel.interface";

export class Promotion{
  constructor(
    public name: string,
    public description: string,
    public startDate: Date,
    public finishDate: Date,
    public img?: Img,
    public active?: boolean,
    public deleteDate?: Date,
    public deleteUser?: UserInterface,
    public deleteReason?: string
  ) {
  }
}
