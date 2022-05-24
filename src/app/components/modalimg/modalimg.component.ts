import { Component} from '@angular/core';
import {ModalimgService} from "../../services/modalimg.service";
import {FileUploadService} from "../../services/file-upload.service";
import Swal from "sweetalert2";
import {UserService} from "../../services/models/user.service";

@Component({
  selector: 'app-modalimg',
  templateUrl: './modalimg.component.html',
  styleUrls: ['./modalimg.component.css']
})
export class ModalimgComponent{

  private _imgUpload: File | undefined;
  private _imgTemp: any;

  get imgTemp(){
    return this._imgTemp;
  }

  constructor(public service : ModalimgService,
              private fileService: FileUploadService,
              private userService: UserService) { }

  async update() {
      await this.fileService.updateFile(this._imgUpload!, this.service.type!, this.service.id)
        .then( _ => {
          if(this.userService.userActive.id === this.service.id){
            this.userService.userActive.img.url = this._imgTemp;
          }
          Swal.fire('Actualizado!', 'Archivo actualizado', 'success');
          this.closeModal();
        }).catch( _ => {
          Swal.fire('Error', 'no se pudo subir la imagen', 'error');
      })
  }

  closeModal() {
    this._imgTemp = null;
    this.service.closeModal();
  }

  /**
   * Método para recoger un archivo
   */
  changeImg(event: any) {
    const file = event.files[0];
    this._imgUpload = event.files[0];

    if(!file){
      return this._imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this._imgTemp = reader.result;
    }

    return;
  }
}
