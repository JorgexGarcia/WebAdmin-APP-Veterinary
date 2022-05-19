import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchService} from "../../../../services/search.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Treatment} from "../../../../models/models/treatment.model";
import {TreatmentService} from "../../../../services/models/treatment.service";

@Component({
  selector: 'app-alltreatment',
  templateUrl: './alltreatment.component.html',
  styleUrls: ['./alltreatment.component.css']
})
export class AlltreatmentComponent implements OnInit, OnDestroy {

  private _waiting = false;
  private _total: number = 0;
  private _treatments: Treatment[] = [];
  private _page: number = 0;
  private _active: boolean = true;
  private _serviceTreatment: Subscription | undefined;

  get waiting() {
    return this._waiting;
  }

  get total() {
    return this._total;
  }

  get treatments() {
    return this._treatments;
  }

  get active() {
    return this._active;
  }

  @ViewChild('txtTer') searchInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private service: TreatmentService,
              private search: SearchService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getTreatments();
  }

  searchTreatment(value: string) {
    if (value != '') {
      this.search.search('treatment', value).subscribe((resp: any) => {
        this._treatments = resp.data.filter((treatment: Treatment) => treatment.active == this._active);
      })
    } else {
      this.getTreatments();
    }
  }

  changePage(value: number) {
    this._page += value;
    if (this._page < 0) {
      this._page = 0
    } else if (this._page * 5 >= this._total) {
      this._page -= value;
    }
    this.getTreatments();
  }

  async deleteTreatment(id: string) {
    const {value, isConfirmed} = await Swal.fire<string>({
      title: '¿Quieres eliminar el usuario?',
      icon: 'warning',
      input: 'text',
      inputPlaceholder: 'Motivo',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,elimina!',
      cancelButtonText: 'Cancelar'
    });
    if (isConfirmed) {
      let data;
      if (value) {
        data = {
          reason: value
        }
      } else {
        data = {}
      }
      this.service.deleteTreatment(id, data).subscribe({
        next: resp => {
          this.getTreatments();
          Swal.fire('Eliminado!', resp.msg, 'success')
        },
        error: err => {
          Swal.fire('Error', err.msg, 'info')
        }
      });
    }
  }

  open(item: any, type: String) {
    this.router.navigateByUrl(`main/${type}/${item._id}`);
  }

  private async getTreatments() {
    this._waiting = true;
    this._treatments = [];
    if (this._serviceTreatment) {
      await this._serviceTreatment.unsubscribe();
    }
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
    this._serviceTreatment = this.service.getTreatments(this._page, this.active).subscribe((resp: any) => {
      this._total = resp.total;
      if (resp.data.length !== 0) {
        this._treatments = resp.data
      }
      this._waiting = false;
    })
  }

  activeTreatments(value: boolean) {
    this._active = value;
    this.getTreatments();
  }

  activeTreatment(item: Treatment) {
    this.service.createTreatment(item).subscribe({
      next: (resp: any) => {
        this.getTreatments();
        Swal.fire('Actualizado!', resp.msg, 'success')
      },
      error: err => {
        Swal.fire('Cambios no guardados', err.msg, 'info');
      }
    });
  }

  updateElement(id: string = 'new') {
    this.router.navigateByUrl(`main/treatment/${id}`);
  }

  ngOnDestroy() {
    if (this._serviceTreatment) {
      this._serviceTreatment.unsubscribe();
    }
  }
}
