import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/environments/User';
import { Constants } from '../config/constants';
import { ApiHttpService } from './api-http.service';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    

    constructor(
        private constants: Constants, 
        private apiService: ApiHttpService
        ) {}

    public verifyCredentials(email: string, password: string): Observable<any> {
        var params = {
            email: email,
            password: password
        }
        return this.apiService.post(this.constants.API_VERIFY_CREDENTIALS, {params: params}, {responseType: 'json'});
    }

    public registerUser(email: string, user: string, password: string): Observable<any> {
        var params = {
            email: email,
            user: user,
            password: password
        }
        return this.apiService.post(this.constants.API_USER_REGISTER, {params: params}, {responseType: 'json'});
    }

}