import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/account.action';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hidePassword = true;
  name: string;
  surname: string;
  password: string;
  token: ''
  emailExists = false;

  constructor(private loginRegisterService: LoginRegisterService, private router: Router, private store: Store<any>) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if (token) {
      this.router.navigate(['/']);
    }

  }

  register() {
    this.emailExists = false;
    console.log(this.email);
    if(this.name && this.surname && this.email.value && this.password  )
    this.loginRegisterService.register(this.name, this.surname, this.email.value, this.password).subscribe((response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('nameSurname', response.nameSurname);
      this.store.dispatch(login());
      this.router.navigate(['/']);
    }, (errorInfo) => {
        console.log(errorInfo.error);
      switch(errorInfo.error){
        case 'EmailExists':
          console.log(1);
          this.emailExists = true;
      }
    });
  }

}
