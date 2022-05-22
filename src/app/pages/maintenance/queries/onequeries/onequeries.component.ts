import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, mergeMap, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalimgService} from "../../../../services/modalimg.service";
import Swal from "sweetalert2";
import {QueriesService} from "../../../../services/models/queries.service";
import {ReportInterface} from "../../../../models/interfaces/interfacesModel.interface";
import {Pet} from "../../../../models/models/pet.model";
import {User} from "../../../../models/models/user.model";
import {PetService} from "../../../../services/models/pet.service";
import {UserService} from "../../../../services/models/user.service";
import {Queries} from "../../../../models/models/queries.model";
import {Service} from "../../../../models/models/service.model";
import {ServiceService} from "../../../../services/models/service.service";
import {TreatmentService} from "../../../../services/models/treatment.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-onequeries',
  templateUrl: './onequeries.component.html',
  styleUrls: ['./onequeries.component.css']
})
export class OnequeriesComponent implements OnDestroy, OnInit{

  private _queries: Queries | undefined;
  private _allQueries: Queries[] = [];
  private _waiting = false;
  private _new = false;
  private _serviceQueries: Subscription | undefined;
  private _serviceForkJoin: Subscription | undefined;
  private _id: string = '';
  public reports: ReportInterface[] = [];
  public pet: any;
  public allPets: Pet[] = [];
  public user: any;
  public treatment: any;
  private _treatmentNew: any;
  public allUsers: User[] = [];
  public service: any;
  public allServices: Service[] = [];

  public bol1: boolean = false;
  public bol2: boolean = false;
  public bol3: boolean = false;
  public createShow = true;
  public equal: boolean = false;

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
              private treatmentService: TreatmentService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: ModalimgService) {

    this._changeForm = this.fb.group({
      id: [''],
      type: ['', [Validators.required]],
      idPet: [''],
      idUser: [''],
      description: ['', [Validators.required]],
      service: [''],
      tests: [''],
      startDate: [Date, [Validators.required]],
      finishDate: [Date],
      firstObservation: [''],
      treatment: [''],
      diagnostic: [''],
      finish: [false]
    },{
      validators: this.checkEqualDate('startDate')
    });
  }

  ngOnInit() {
    this.getQueries()
  }

  async getQueries(){
    this._id = this.activatedRoute.snapshot.params['id'];

    this._getData()

    if(this._id !== 'new'){
      this.bol1 = true;
      this.bol2 = true;
      this.bol3 = true;
      if(!this.treatmentService.finish){
        this._waiting = true;
        this._serviceQueries = await this.queriesService.getOneQueries(this._id)
          .subscribe({
            next: resp => {
              this.pet = resp.data.idPet;
              this.user = resp.data.idUser;
              this.reports = resp.data.reports;
              this.treatment = resp.data.treatment;
              this.service = resp.data.service;
              this._queries = resp.data;
              if(!this._queries) this.route.navigateByUrl('main');
              if(this._queries?.treatment){
                this.createShow = false;
              }
              this.updateForm();
            },
            error: err => {Swal.fire('Error', err.error.msg, 'error');
              this.route.navigateByUrl('main');}
          });
      }else{
        const {user, pet, serviceTemp, reports, ...fields} = this.treatmentService.data;
        this._queries = fields;
        this.user = user;
        this._queries!.idUser = user._id;
        this.pet = pet;
        this._queries!.idPet = pet._id;
        this.service = serviceTemp;
        this._queries!.service = serviceTemp._id;
        this.reports = reports;
        this.treatment = this.treatmentService.treatment;
        this.updateForm();
      }

    }else{
      this._new = true;
      this.updateForm();
    }
  }

  private async _getData(){
    const observableServiceUser = await this.userService.getAllUsers();
    const observableServicePet = await this.petService.getPetsAll();
    const observableServiceService = await this.serviceService.getServicesAll();
    const observableServiceQueries = await this.queriesService.getQueriesAll();

    this._serviceForkJoin = await forkJoin([observableServiceUser,
      observableServicePet,
      observableServiceService, observableServiceQueries])
      .subscribe({
        next: results => {
          this.allUsers = results[0].data;
          this.allPets = results[1].data;
          this.allServices = results[2].data;
          this._allQueries = results[3].data;
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
        this.changeDateStart(this._queries.startDate.toString());
        this._changeForm.get('firstObservation')!.setValue(this._queries.firstObservation);
        this._changeForm.get('treatment')!.setValue(this._queries.treatment);
        this._changeForm.get('diagnostic')!.setValue(this._queries.diagnostic);
        this._changeForm.get('finish')!.setValue(this._queries.finish);
      }
      this._waiting = false;
    }else{
      if(this.queriesService.newDate){
        this.changeDateStart(this.queriesService.date.toISOString());
      }else{
        let date = new Date();
        date.setHours(date.getHours() +2);
        this.changeDateStart(date.toISOString());
      }
    }
  }

  changeDateStart(date :string){

    //Obtener Valores
    const day = date.split('T')[0].split('-')[2];
    const month = date.split('T')[0].split('-')[1];
    const year = date.split('T')[0].split('-')[0];
    let dateHorStart = date.split('T')[1].split(':')[0];
    let dateMinStart = date.split('T')[1].split(':')[1];

    let dateHorFinish = dateHorStart;
    let dateMinFinish: string;

    //Comprobar Horario consultas
    if(Number(dateHorStart) < 9){
      dateHorStart = '09';
      dateMinStart = '00';
      dateHorFinish = dateHorStart;
      dateMinFinish = '30';
    }else{
      if(Number(dateHorStart) > 19){
        dateHorStart = '19';
        dateMinStart = '00';
        dateHorFinish = dateHorStart;
        dateMinFinish = '30';
      }else{
        //Intervalos de 30 min
        if(Number(dateMinStart) <= 59 && Number(dateMinStart) > 30){
          dateMinStart = '00';
          dateMinFinish = '30';
          const num = Number(dateHorStart);
          dateHorStart = `${num + 1}`;
          dateHorFinish = dateHorStart;
        }else{
          if(Number(dateMinStart) != 0){
            dateMinStart = '30'
            dateMinFinish = '00';
            const num = Number(dateHorFinish);
            dateHorFinish = `${num + 1}`;
          }else{
            dateMinFinish = '30';
          }
        }
        if(dateHorStart.length == 1){
          dateHorStart = '0'.concat(dateHorStart);
        }
        if(dateHorFinish.length == 1){
          dateHorFinish = '0'.concat(dateHorFinish);
        }
      }
    }

    const dat1 = year.concat('-').concat(month).concat('-').concat(day).concat('T')
      .concat(`${dateHorStart}`).concat(':').concat(`${dateMinStart}`);
    const dat2 = year.concat('-').concat(month).concat('-').concat(day).concat('T')
      .concat(`${dateHorFinish}`).concat(':').concat(`${dateMinFinish}`);

    //Devolver horas
    this._changeForm.get('startDate')!.setValue(dat1);
    this._changeForm.get('finishDate')!.setValue(dat2);
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
        this._confirmSave();
      }
    });
  }

  private async _confirmSave(){
    this._formSubmitted = true;

    if(!this._changeForm.valid){
      return;
    }

    this._waiting = true;

    let data = {
      ...this._changeForm.value,
      idUser: this.user._id,
      idPet: this.pet._id,
      treatment: this.treatment?._id,
      service: this.service._id,
      reports: this.reports,
    }

    if(!this._new){

      if(this.treatment){
        if(this.treatment.name && !this.treatment.id){
          await this._createNewTreatment(data);
        }
      }

      await this.queriesService.updateQueries(data).subscribe({
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
    if(this.queriesService.newDate){
      this.queriesService.newDate = false;
      return this.route.navigateByUrl('/main');
    }else{
      this.treatmentService.finish = false;
      if(this._new && this._formSubmitted){
        this._new = false;
        return this.route.navigateByUrl(`/main/queries/${this._id}`);
      }else {
        return this.route.navigateByUrl('/main/queries');
      }
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
    this.pet._id = pet.id;
    this.bol1 = true;
  }

  changeUser(user: User) {
    this.user = user;
    this.user._id = user.id;
    this.bol2 = true;
  }

  changeService(service: Service) {
    this.service = service;
    this.service._id = service.id;
    this.bol3 = true;
  }

  createTreatment() {
    this.treatmentService.data = {
      ...this._changeForm.value,
      idUser: this.user?.id,
      idPet: this.pet?.id,
      treatment: this.treatment?.id,
      service: this.service?.id,
      reports: this.reports,
      user: this.user,
      pet: this.pet,
      serviceTemp: this.service,
    };
    this.route.navigateByUrl(`main/treatment/new`);
  }

  finish() {
    Swal.fire({
      title: '¿Quieres finalizar la consulta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._changeForm.get('finish')?.setValue(true);
        this._confirmSave();
      }
    });
  }

  private async _createNewTreatment(dataQueries :any) {

    const data = {
      ...this.treatment,
      idPet: this.pet._id
    }

    await this.treatmentService.createTreatment(data)
      .pipe(map(resp => {
        this._treatmentNew = resp.data;
        dataQueries.treatment = this._treatmentNew.id;
        return dataQueries;
      }),
      mergeMap(res => {
        return this.queriesService.updateQueries(res);
      })).subscribe({
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

  }

  private checkEqualDate(date: string) {
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(date);

      this.equal = false;
      this._allQueries.filter(item => {
        if(new Date(item.startDate).getFullYear() === new Date(pass1Control!.value).getFullYear() &&
          new Date(item.startDate).getMonth() === new Date(pass1Control!.value).getMonth() &&
          new Date(item.startDate).getDate() === new Date(pass1Control!.value).getDate() &&
          new Date(item.startDate).getHours()=== new Date(pass1Control!.value).getHours() &&
          new Date(item.startDate).getMinutes() === new Date(pass1Control!.value).getMinutes()) {
          this.equal = true;
        }
      })
      if(this.equal){
        pass1Control!.setErrors({DateEqual: true});
      }else{
        pass1Control!.setErrors(null);
      }
    }
  }
}
