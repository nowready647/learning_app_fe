import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Constants } from "../config/constants";
import { Message } from "src/environments/Message";
import * as moment from "moment";
import { SessionStorageService } from "ngx-webstorage";

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(
        protected sessionStorage: SessionStorageService,
        protected contstants: Constants,
        protected http: HttpClient
    ) {}

    public getList(limit: number | null = null, id: number | null, page: number | null, filters: object): Observable<any> {
        return this.http.post(this.contstants.API_MESSAGE_BASE_URL, {limit: limit, id: id, page: page, filters: filters}).pipe(map((data: any) => {
            return data.map((item: any) => this.mapEntity(item));
        }))
    }

    public find(id: number): Observable<any> {
        return this.http.post(this.contstants.API_MESSAGE_FIND, {id}).pipe(map((data: any) => {
            return this.mapEntity(data.result);
        }));
    }

    public add(data: Message): Observable<any> {
        const at = this.sessionStorage.retrieve('AccessToken');
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': at
          })
        };
        return this.http.post(this.contstants.API_MESSAGE_ADD, { message: data }, httpOptions);
    }

    public solve(message: Message): Observable<any> {
        const at = this.sessionStorage.retrieve('AccessToken');
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization': at
          })
        };
        return this.http.post(this.contstants.API_MESSAGE_SOLVE, { message: message }, httpOptions);
    }


    protected mapEntity(data: any): Message {
        let message = { ...data } as Message;
        message.date_add = moment(data.date_add).format('DD.MM.Y');
        if(data.answers) {
            message.answers = data.answers.map((item: any) => this.mapEntity(item));
        }
        return message;
      }

}