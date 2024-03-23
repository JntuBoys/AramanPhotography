import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormControlName,
  Validators,
} from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  
})
export class RegisterComponent {
  body1: any;
  selectedIndex = 0;
  showRegistrationForm: boolean=false;
  constructor(private service: ServicesService, private router: Router) {}
  Registerform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    role:new FormControl('', [Validators.required]),
  })
  onRoleChange(value: string) {
    this.Registerform.patchValue({
      role: value
    });
  }
  get username() {
    return this.Registerform.get('username');
  }
  get password() {
    return this.Registerform.get('password');
  }
  get email1() {
    return this.Registerform.get('email');
  }
  submit(Registerform: FormGroup<any>) {
    console.log("kjjj",Registerform)
    const form = new FormData();
    let obj=
    {
      username:Registerform.value.username,
      password:Registerform.value.password,
      email: Registerform.value.email,
      roleId: Registerform.value.role
    }
    // form.append('username', Registerform.value.username);
    // form.append('password', Registerform.value.password);
    // form.append('email', Registerform.value.email);
    // form.append('roleId', Registerform.value.roleId);
    
    console.log(form);
      this.service.register(obj).subscribe((_data) => {
        alert('Registerwed succesfully');
        setTimeout(() => {
          this.router.navigate(['/', 'login']);
        }, 1000);
      });
  }
}
