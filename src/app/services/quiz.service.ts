import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventType } from "@angular/router";
import { map, Observable } from "rxjs";
import { Quiz } from "src/environments/Quiz";
import { User } from "src/environments/User";
import { Constants } from "../config/constants";
import { ApiHttpService } from "./api-http.service";

@Injectable({
    providedIn: 'root',
  })
export class QuizService {
    constructor(
        private constants: Constants, 
        private apiService: ApiHttpService,
        private httpClient: HttpClient,
        ) {}

    public getList(): Observable<any> {
        return this.httpClient.get<Array<Quiz>>(this.constants.API_QUIZ_BASE_URL, {responseType: 'json'});
    }

    public add(formValues: Array<any>): Observable<any> {
        return this.httpClient.post(this.constants.API_QUIZ_ADD, { quiz: formValues })
    }

    public find(id: number): Observable<any> {
        return this.httpClient.post(this.constants.API_QUIZ_FIND, { id: id })
    }

    public delete(id: number): Observable<any> {
        return this.httpClient.post(this.constants.API_QUIZ_DELETE, { id: id })
    }
}