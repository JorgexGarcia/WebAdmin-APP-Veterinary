import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalimgService} from "../../../../services/modalimg.service";
import Swal from "sweetalert2";
import {QueriesService} from "../../../../services/models/queries.service";
import {
  PetInterface,
  ReportInterface, ServiceInterface,
  UserInterface
} from "../../../../models/interfaces/interfacesModel.interface";
import {Pet} from "../../../../models/models/pet.model";
import {User} from "../../../../models/models/user.model";
import {PetService} from "../../../../services/models/pet.service";
import {UserService} from "../../../../services/models/user.service";
import {Queries} from "../../../../models/models/queries.model";
import {Service} from "../../../../models/models/service.model";
import {ServiceService} from "../../../../services/models/service.service";

@Component({
  selector: 'app-onequeries',
  templateUrl: './onequeries.component.html',
  styleUrls: ['./onequeries.component.css']
})
export class OnequeriesComponent implements OnDestroy, OnInit{

  private _queries: Queries | undefined;
  private _waiting = false;
  private _new = false;
  private _serviceQueries: Subscription | undefined;
  private _serviceForkJoin: Subscription | undefined;
  private _id: string = '';
  public reports: ReportInterface[] = [];
  public pet: PetInterface | undefined;
  public allPets: Pet[] = [];
  public user: UserInterface | undefined;
  public allUsers: User[] = [];
  public service: ServiceInterface | undefined;
  public allServices: Service[] = [];

  public bol1: boolean = false;
  public bol2: boolean = false;
  public bol3: boolean = false;

  get new(){return this._new;}
  get waiting(){return this._waiting;}

  get queries():Queries{
    return this._queries!;
  }

  private _changeForm: FormGroup;
  private _formSubmitted = false;

  get changeForm(){
    return this._changeForm;
  }

  constructor(private fb: FormBuilder,
              private queriesService: QueriesService,
              private petService: PetService,
              private userService: UserService,
              private serviceService: ServiceService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalimgService) {

    this._changeForm = this.fb.group({
      id: [''],
      type: [''],
      idPet: ['', [Validators.required]],
      idUser: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      service: ['', [Validators.required]],
      tests: [''],
      startDate: [Date, [Validators.required]],
      finishDate: [Date],
      firstObservation: [''],
      treatment: [''],
      diagnostic: [''],
      finish: [false]
    });
  }

  ngOnInit() {
    this.getQueries()
  }

  async getQueries(){
    this._id = this.activatedRoute.snapshot.params['id'];

    this._getData()

    if(this._id !== 'new'){
      this._waiting = true;
      this._serviceQueries = await this.queriesService.getOneQueries(this._id)
        .subscribe({
          next: resp => {
            const {idUser, idPet, reports, ...fields} = resp.data;
            this.pet = idPet;
            this.user = idUser;
            this.reports = reports;
            this._queries = fields;
            this.bol1 = true;
            if(!this._queries) this.route.navigateByUrl('main');
            this.updateForm();
          },
          error: err => {Swal.fire('Error', err.error.msg, 'error');
            this.route.navigateByUrl('main');}
        });
    }else{
      this._new = true;
      this.updateForm();
    }
  }

  private async _getData(){
    const observableServiceUser = await this.userService.getAllUsers();
    const observableServicePet = await this.petService.getPetsAll();
    const observableServiceService = await this.serviceService.getServicesAll();

    this._serviceForkJoin = await forkJoin([observableServiceUser,
      observableServicePet,
      observableServiceService])
      .subscribe({
        next: results => {
          this.allUsers = results[0].data;
          this.allPets = results[1].data;
          this.allServices = results[2].data;
          console.log(this.allUsers)
          console.log(this.allPets)
          console.log(this.allServices)
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error')
        }
      });
  }

  updateForm(){
    if(!this._new){
      if(this._queries){
        this._changeForm.get('id')!.setValue(this._queries.id);
        this._changeForm.get('type')!.setValue(this._queries.type);
        this._changeForm.get('idPet')!.setValue(this._queries.idPet.id);
        this._changeForm.get('idUser')!.setValue(this._queries.idUser.id);
        this._changeForm.get('service')!.setValue(this._queries.service.id);
        this._changeForm.get('description')!.setValue(this._queries.description);
        this._changeForm.get('tests')!.setValue(this._queries.tests);
        const date = this._queries.startDate.toString().toString().split('.')[0];
        const date2 = (this._queries.finishDate)?
          this._queries.finishDate.toString().toString().split('.')[0]:
          new Date().toISOString().split('.')[0];
        this._changeForm.get('startDate')!.setValue(date);
        this._changeForm.get('finishDate')!.setValue(date2);
        this._changeForm.get('firstObservation')!.setValue(this._queries.firstObservation);
        this._changeForm.get('treatment')!.setValue(this._queries.treatment);
        this._changeForm.get('diagnostic')!.setValue(this._queries.diagnostic);
        this._changeForm.get('finish')!.setValue(this._queries.finish);
      }
      this._waiting = false;
    }else{
      const date = new Date().toISOString().split('.')[0];
      console.log(date)
      this._changeForm.get('startDate')!.setValue(date);
      this._changeForm.get('finishDate')!.setValue(date);
    }
  }

  save() {
    Swal.fire({
      title: '¿Quieres guardar los cambios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._confirmSave()
      }
    });
  }

  private async _confirmSave(){
    this._formSubmitted = true;

    if(!this._changeForm.valid){
      return;
    }

    this._waiting = true;

    const data = {
      ...this._changeForm.value,
      idUser: this.user?.id,
      idPet: this.user?.id,
      service: this.service?.id,
      reports: this.reports,
    }

    if(!this._new){
      this.queriesService.updateQueries(data).subscribe({
        next: (resp:any )=> {
          this._waiting = false;
          Swal.fire('Actualizado!', resp.msg, 'success');
          this.back();
        },
        error: err => {
          this._waiting = false;
          Swal.fire('Cambios no guardados', err.error.msg, 'info')
        }
      });
    }else{
      await this.queriesService.createQueries(data).subscribe({
        next: (resp:any )=> {
          this._waiting = false;
          this._id = resp.data.id;
          Swal.fire('Creado!', resp.msg, 'success');
        },
        error: err => {
          this._waiting = false;
          Swal.fire('Cambios no guardados', err.error.msg, 'info')
        },
        complete: () => {
          this.back()
        }
      });
    }
  }

  back() {
    if(this._new && this._formSubmitted){
      this._new = false;
      this.route.navigateByUrl(`/main/queries/${this._id}`);
    }else {
      this.route.navigateByUrl('/main/queries');
    }
  }

  fieldNoValid(name: string) {
    return this._changeForm.get(name)!.invalid && this._formSubmitted;
  }

  ngOnDestroy(){
    if(this._serviceQueries){
      this._serviceQueries.unsubscribe();
    }
    if(this._serviceForkJoin){
      this._serviceForkJoin.unsubscribe();
    }
  }

  openModalImg() {
    this.modalService.openModal('queries',
      this._id)
  }

  changePet(pet: Pet) {
    this.pet = pet;
    console.log(this.pet)
    this.bol1 = true;
  }

  changeUser(user: User) {
    this.user = user;
    console.log(this.user)
    this.bol2 = true;
  }

  changeService(service: Service) {
    this.service = service;
    console.log(this.service)
    this.bol3 = true;
  }

}
