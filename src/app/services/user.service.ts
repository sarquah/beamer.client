import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/v1/user';
  private baseUrl = `${environment.beamerAPIEndpoint}/${this.apiUrl}`;
  private accountInfo: AccountInfo;

  constructor(
    private httpClient: HttpClient,
    private authService: MsalService
  ) {
    this.accountInfo = this.authService.instance.getAllAccounts().pop();
  }

  public getUsers(): Observable<IUser[]> {
    const params: HttpParams = new HttpParams().set('tenantId', this.accountInfo.tenantId);
    const url = `${this.baseUrl}/users`;
    return this.httpClient.get<IUser[]>(url, { params });
  }

  public createUsers(users: IUser[]): Observable<IUser[]> {
    const editedUsers = users.map(x => this.addTenantIdToUser(x));
    const url = `${this.baseUrl}/users`;
    return this.httpClient.post<IUser[]>(url, editedUsers);
  }

  private addTenantIdToUser(user: IUser): IUser {
    return {
      ...user,
      tenantId: this.accountInfo.tenantId
    };
  }
}
