import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Demande } from '../models/demande.model';

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
        let url = this.baseURL + "create/";
        let request = this.http.post(url, demande, {headers: this.httpHeaders});
        console.log(request);
        return request;
    }

    getDemandeWithId(id: number) {
        let url = this.baseURL + id + "/";
        return this.http.get(url, {headers: this.httpHeaders});
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };

    getDemandeEnAttenteHierarchiqueOf(username: string): Observable<HttpResponse<Demande[]>> {
        let url = this.baseURL + "en-attente/hierarchie/" + username + "/";
        return this.http.get<Demande[]>(url, {observe: 'response'}).pipe(
            tap(_ => console.log(`Fetched ${this.getDemandeEnAttenteHierarchiqueOf.name} ${username} from ${url}`)),
            catchError(this.handleError)
        )
    }
}