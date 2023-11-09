import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Lection } from 'src/environments/Lection';
import { Constants } from '../config/constants';

@Injectable({
  providedIn: 'root',
})
export class LectionService {

  constructor(
    private constants: Constants,
    private http: HttpClient
    ) {

   }

    getLection(id: number) {
      var params = {
        id: id
    }
        return this.http.post(this.constants.API_LECTION_FIND, { params: params }, { responseType: 'json' }).pipe(
            map((res: any) => {
                  let lection = {
                    id: res.data.id,
                    title: res.data.title,
                    content: res.data.content
                  } as Lection
                  return lection;
              })
        )
    }

}