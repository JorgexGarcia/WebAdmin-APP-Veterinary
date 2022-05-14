import {Img} from "./img.model";
import {UserInterface} from "../interfaces/interfacesModel.interface";

export class Aids{
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public img: Img,
    public content: string,
    public idUser: UserInterface
  ) {
  }
}
