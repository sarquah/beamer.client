import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUser } from '../models/interfaces/IUser';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  public getGroups(): Observable<any> {
    return this.httpClient.get<any>(`${environment.graphAPI.endpoint}/${environment.graphAPI.groupsResource}`)
  }

  public getGroupMembers(id: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.graphAPI.endpoint}/${environment.graphAPI.groupsResource}/${id}/${environment.graphAPI.membersResource}`)
  }

  public createForm(): FormGroup {
    const formControls = {
      userGroupId: new FormControl('', Validators.required),
      adminGroupId: new FormControl('', Validators.required)
    };
    return this.formBuilder.group(formControls);
  }

  public syncGroup(userGroupId: string, tenantId: string): Observable<IUser[]> {
    return this.getGroupMembers(userGroupId).pipe(
      switchMap(groupMembers => {
        const users: IUser[] = groupMembers.value.map(member => {
          return {
            name: member.displayName,
            department: '',
            role: member.jobTitle,
            tenantId,
            email: member.mail
          }
        });
        return this.userService.createUsers(users)
      }),
      catchError(error => {
        console.error(error);
        return throwError(error);
      })
    )
  }
}
