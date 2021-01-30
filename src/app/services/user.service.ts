import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IUser } from '../models/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/v1/user';
  private baseUrl = `${environment.beamerAPIEndpoint}/${this.apiUrl}`;
  private accountInfo: AccountInfo;
  private readonly params: HttpParams = new HttpParams();

  constructor(
    private httpClient: HttpClient,
    private authService: MsalService
  ) {
    if (this.authService.instance.getAllAccounts().length > 0) {
      this.accountInfo = this.authService.instance.getAllAccounts()[0];
    }
  }

  public getUsers(): Observable<IUser[]> {
    if (this.accountInfo) {
      this.params.set('tenantId', this.accountInfo.tenantId);
    }
    const url = `${this.baseUrl}/users`;
    return this.httpClient.get<IUser[]>(url, { params: this.params });
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
