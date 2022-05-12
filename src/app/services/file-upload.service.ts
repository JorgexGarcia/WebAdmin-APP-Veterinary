import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private _baseUrl = environment.base_url;

  constructor() { }

  async updateFile(
    file: File,
    type: 'user' | 'aids' | 'queries' | 'promotion' | 'product' | 'pet',
    id: string
    ) {
      try {

        const url = `${this._baseUrl}/upload/${type}/${id}`;

        const formData = new FormData();
        formData.append('file', file);

        const resp = await fetch(url, {
          method: 'PUT',
          headers: {
            'token' :  localStorage.getItem('token') || ''
          },
          body: formData
        });

        const data = await resp.json();

        if(data.ok){
          return data.msg;
        }else{
          return data.msg;
        }


      }catch (err){
        return 'Error al subir el archivo';
      }
  }

}
