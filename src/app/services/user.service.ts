import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'api/v1/user';
  private readonly baseUrl = `${environment.beamerAPIEndpoint}/${this.apiUrl}`;
  private readonly accountInfo: AccountInfo;
  private readonly params: HttpParams;

  constructor(
    private httpClient: HttpClient,
    private authService: MsalService
  ) {
    if (this.authService.instance.getAllAccounts().length > 0) {
      this.accountInfo = this.authService.instance.getAllAccounts()[0];
      this.params = new HttpParams().set('tenantId', this.accountInfo.tenantId);
    }
  }

  public getUsers(): Observable<IUser[]> {
    if (this.accountInfo) {
      const url = `${this.baseUrl}/users`;
      return this.httpClient.get<IUser[]>(url, { params: this.params });
    } else {
      return throwError('Not logged in')
    }
  }

  public createUsers(users: IUser[]): Observable<IUser[]> {
    const editedUsers = users.map(x => this.addTenantIdToUser(x));
    const url = `${this.baseUrl}/users`;
    return this.httpClient.post<IUser[]>(url, editedUsers);
  }

  private addTenantIdToUser(user: IUser): IUser {
    return this.accountInfo ? {
      ...user,
      tenantId: this.accountInfo.tenantId
    } : user;
  }
}
