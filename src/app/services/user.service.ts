import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/environments/User';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    protected constants: Constants,
    protected http: HttpClient
    ) {}

  public find(id: number): Observable<any> {
    return this.http.post(this.constants.API_USER_FIND, { id: id });
  }
}
