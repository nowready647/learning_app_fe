import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiHttpService {
    constructor(private http: HttpClient) {} 

        public get<arg>(url: string, options?: any) { 
            return this.http.get<arg>(url, options); 
        } 
        
        public post<arg>(url: string, data: any, options?: any) { 
            return this.http.post<arg>(url, data, options); 
        } 
        
        public put(url: string, data: any, options?: any) { 
            return this.http.put(url, data, options); 
        } 
        
        public delete(url: string, options?: any) { 
            return this.http.delete(url, options); 
        } 
    }