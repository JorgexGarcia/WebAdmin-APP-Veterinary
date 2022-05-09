import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/models/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public changeForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    const user: User = userService.userActive;
    const date = user.birthDate.toString().split('T')[0];
    this.changeForm = this.fb.group({
      name: [user.name],
      lastName: [user.lastName],
      birthDate: [date],
      phone: [user.phone],
      province: [user.province],
      city: [user.city],
      address: [user.address]
    });
  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.changeForm.value);
    this.userService.updateUser(this.changeForm.value).subscribe(resp => {
      console.log(resp);
    })
  }

  openModalImg() {

  }

  openModalPassword() {

  }

  checkDate() {
    const date = new Date();
    if(date < new Date(this.changeForm.get('birthDate')?.value)){
      this.changeForm.get('birthDate')?.setValue(date.toISOString().split('T')[0]);
    }
  }
}
