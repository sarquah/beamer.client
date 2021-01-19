import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public register$: Observable<any>;
  public errorMsg: string;
  public successMsg: string;

  constructor(
    private authService: AuthService
  ) { }

  public ngOnInit() {
    this.form = this.authService.createRegisterForm();
  }

  public register() {
    this.errorMsg = null;
    this.successMsg = null;

    if (this.form.valid) {
      this.authService.register(this.form.value).pipe(
        catchError(error => {
          this.errorMsg = this.getServerErrorMessage(error);
          return EMPTY;
        })
      ).subscribe(() => this.successMsg = 'Account succesfully created')
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
