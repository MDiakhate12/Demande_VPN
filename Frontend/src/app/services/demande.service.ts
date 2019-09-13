import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class DemandeService {

    baseURL = "http://127.0.0.1:8000/";
    httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    
    constructor(private http: HttpClient) {

    }

    sendDemande(demande){
        let url = "api/demandes/";
        console.log(demande);
        console.log(this.baseURL + url);
        let request = this.http.post(this.baseURL + url, demande, {headers: this.httpHeaders});
        console.log(request);
        return request;
    }
}