import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfileModel } from '../models/profile-model';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public login$: Observable<any>;
  public errorMsg: string;
  public successMsg: string;

  constructor(
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.form = this.authService.createLoginForm();
  }

  public login() {
    this.errorMsg = null;
    this.successMsg = null;

    if (this.form.valid) {
      this.authService.login(this.form.value).pipe(
        catchError(error => {
          this.errorMsg = this.getServerErrorMessage(error);
          return EMPTY;
        })
      ).subscribe((authToken) => {
        this.successMsg = 'Login succesfully'
        const now = new Date();
        authToken.expiration_date = new Date(now.getTime() + authToken.expires_in * 1000).getTime().toString();
        const profile: ProfileModel = jwt_decode(authToken.id_token);
        localStorage.setItem('auth-tokens', JSON.stringify(authToken));
      });
    }
  }

  public getErrorMessage() {
    if (this.form.controls.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.controls.username.hasError('email') ? 'Not a valid email' : '';
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return `Bad request: ${Object.values(error.error).map(value => value)}`;
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
