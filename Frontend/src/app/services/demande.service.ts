import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Demande } from '../models/demande.model';

@Injectable({
    providedIn: 'root',
})

export class DemandeService {

    baseURL = "http://127.0.0.1:8000/api/demandes/";
    httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    })
    STATUS = [

        "En attente de la validation du supérieur hierarchique",
        "En attente de la validation du supérieur hierarchique",
         "En attente de la validation sécurité",
         "En attente de la validation sécurité",
         "En attente de la configuration de l'admin",
         "Demande validée, VPN ouvert",
         "Demande expirée, VNP fermé"
   ]
    constructor(private http: HttpClient) {

    }

    sendDemande(demande): Observable<HttpResponse<Demande>>{
        console.log(demande);
        let url = this.baseURL + "create/";
        console.log(this.baseURL);
        return this.http.post<Demande>(url, demande, {headers: this.httpHeaders, observe: 'response'});
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