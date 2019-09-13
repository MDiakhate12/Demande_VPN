import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class DemandeService {

    baseURL = "http://127.0.0.1:8000/api/demandes/";
    httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    
    constructor(private http: HttpClient) {

    }

    sendDemande(demande){
        console.log(demande);
        console.log(this.baseURL);
        let url = "create/";
        let request = this.http.post(this.baseURL + url, demande, {headers: this.httpHeaders});
        console.log(request);
        return request;
    }

    getDemandeWithId(id: number) {
        let url = id + "/";
        return this.http.get(this.baseURL + url, {headers: this.httpHeaders});
    }
}