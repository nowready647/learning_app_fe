import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../config/constants";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(
        protected contstants: Constants,
        protected http: HttpClient
    ) {}

    public delete(id: number): Observable<any> {
        return this.http.post(this.contstants.API_QUESTION_DELETE, {id: id});
    }

}