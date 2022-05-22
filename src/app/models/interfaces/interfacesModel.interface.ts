import {Img} from "../models/img.model";

export interface PetInterface {
  id : string,
  name: string,
  img?: Img
}

export interface  PromotionInterface{
  id: string,
  name: string,
  img?: Img
}

export interface  AidsInterface{
  id: string,
  name: string,
  img?: Img
}

export interface UserInterface{
  id: string,
  name: string,
  lastName: string,
  img?: Img
}

export interface ReportInterface{
  name: string,
  typeReport: string,
  reportId: string,
  url: string
}

export interface ServiceInterface{
  id: string,
  name: string,
  img?: Img
}

export interface TreatmentInterface{
  id: string,
  name: string,
  img?: Img
}

export interface BreedInterface{
  id: string,
  name: string,
  img?: Img
}

export interface QueriesInterface{
  id: string,
  description: string,
  type: string,
  idPet: PetInterface
  idUser: UserInterface
}

export interface ProductInterface{
  id: string,
  name: string,
  img?: Img
}

