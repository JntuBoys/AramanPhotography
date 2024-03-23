import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ServicesService } from '../services.service'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { AllProfilesComponent } from '../all-profiles/all-profiles.component'
// Define your custom theme

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        role:new FormControl('ph001',[Validators.required])
    })
    constructor(
        private loginService: ServicesService,
        private router: Router,
        private logoutservice: ServicesService,
        private loc: Location,
        private http: HttpClient
    ) {}

    get username() {
        return this.loginForm.get('username')
    }
    get password() {
        return this.loginForm.get('password')
    }
    onTabChange(event: any): void {
        if (event.index === 0) {
          this.loginForm.get('role')?.setValue('ph001');
        } else if (event.index === 1) {
          this.loginForm.get('role')?.setValue('User001');
        }
      }
    submit(user: FormGroup) {
        let body1 = {
            username: user.value.username,
            password: user.value.password,
            roleId:user.value.role
        }
        console.log('login data', body1)

        this.loginService.login(body1).subscribe(() => {
            this.gotoprofiles()
        })
    }
    gotoprofiles() {
        this.router.navigate(['/', 'allprofiles'])
    }

    logout() {
        this.logoutservice.logout().subscribe((result: any) => {
            if (result) {
                history.pushState(null, '', '/')
                window.onpopstate = function () {
                    history.go(1)
                }
            }
        })
    }
}
