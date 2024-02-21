import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Lection } from 'src/environments/Lection';
import { Constants } from '../config/constants';
import { SessionStorageService } from 'ngx-webstorage';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class LectionService {

  constructor(
    private sanitizer: DomSanitizer,
    private constants: Constants,
    private http: HttpClient
    ) {

   }

    getLection(id: number) {
      var params = {
        id: id
      }
        return this.http.post(this.constants.API_LECTION_FIND, { params: params }).pipe(
            map((res: any) => {
                  let lection = {
                    id: res.data.id,
                    id_quiz: res.data.id_quiz,
                    title: res.data.title,
                    content: res.data.content
                  } as Lection
                  return lection;
              })
        )
    }

}