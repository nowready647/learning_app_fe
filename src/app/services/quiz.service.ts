import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventType } from "@angular/router";
import { map, Observable } from "rxjs";
import { Quiz } from "src/environments/Quiz";
import { User } from "src/environments/User";
import { Constants } from "../config/constants";
import { ApiHttpService } from "./api-http.service";
import { SessionStorageService } from "ngx-webstorage";

@Injectable({
    providedIn: 'root',
  })
export class QuizService {
    constructor(
        protected sessionStorage: SessionStorageService,
        private constants: Constants, 
        private apiService: ApiHttpService,
        private httpClient: HttpClient,
        ) {}

    public getList(id: number | null, page: number | null, filters: object): Observable<any> {
        return this.httpClient.post<Array<Quiz>>(this.constants.API_QUIZ_BASE_URL, { id_user: id, page: page, filters: filters });
    }

    public add(formValues: Array<any>): Observable<any> {
        const at = this.sessionStorage.retrieve('AccessToken');
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': at
          })
        };
        return this.httpClient.post(this.constants.API_QUIZ_ADD, { quiz: formValues }, httpOptions);
    }

    public find(id: number): Observable<any> {
        return this.httpClient.post(this.constants.API_QUIZ_FIND, { id: id });
    }

    public delete(id: number): Observable<any> {
        const at = this.sessionStorage.retrieve('AccessToken');
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': at
          })
        };
        return this.httpClient.post(this.constants.API_QUIZ_DELETE, { id: id }, httpOptions);
    }

    public edit(formValues: Array<any>): Observable<any> {
        const at = this.sessionStorage.retrieve('AccessToken');
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': at
          })
        };
        return this.httpClient.post(this.constants.API_QUIZ_EDIT, { quiz: formValues }, httpOptions);
    }

    public solve(idUser: number, idQuiz: number, points: number): Observable<any> {
        return this.httpClient.post(this.constants.API_QUIZ_SOLVE, { 
            id_user: idUser,
            id_quiz: idQuiz,
            points: points
         });
    }


    public getPopular(): Observable<any> {
        return this.httpClient.get<Array<Quiz>>(this.constants.API_QUIZ_GET_POPULAR);
    }
}