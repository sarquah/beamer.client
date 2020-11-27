import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/v1/user';
  private baseUrl = `${environment.hostName}/${this.apiUrl}`;
  private httpOptions;

  constructor(
    private httpClient: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  public getUsers(): Observable<IUser[]> {
    const url = `${this.baseUrl}/users`;
    return this.httpClient.get<IUser[]>(url);
  }
}
