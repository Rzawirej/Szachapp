import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/account.action';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  email: string;
  password: string;
  token: '';
  badLogin = false;

  constructor(private loginRegisterService: LoginRegisterService, private router: Router, private store: Store<any>) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if (token) {
      this.router.navigate(['/']);
    }

  }

  login() {
    this.badLogin = false;
    this.loginRegisterService.login(this.email, this.password).subscribe((response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('nameSurname', response.nameSurname);
      this.store.dispatch(login());
      this.router.navigate(['/']);
    }, (errorInfo) => {
      console.log(errorInfo.error);
      switch (errorInfo.error) {
        case 'Invalid email or password.':
          console.log(1);
          this.badLogin = true;
      }
    });
  }
}
