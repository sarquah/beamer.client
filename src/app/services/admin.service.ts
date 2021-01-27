import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
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
}
