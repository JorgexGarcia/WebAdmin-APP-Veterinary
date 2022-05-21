import {UserInterface} from "./interfacesModel.interface";


export interface LoginForm{
  email: string,
  password: string,
  remember: boolean
}

export interface TableInterface{
  id: string,
  description?: string,
  name?: string,
  lastName?: string,
  active?: boolean,
  deleteDate?: Date,
  deleteUser?: UserInterface,
  deleteReason?:string
}
