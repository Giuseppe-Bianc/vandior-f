import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, tap } from 'rxjs';
//import { Utente } from 'src/app/model/utente';
//import { environment } from 'src/environments/environment';
import { ModelloService } from '../modello.service';
import { Utente } from '../../model/utente';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class DaoUtenteService {

  constructor(private httpClient: HttpClient, private modello: ModelloService) { }

  login(email: string, password: string): Promise<Utente> {
    let apiURL = environment.backendUrl + '/utenti/login';
    return lastValueFrom(
      this.httpClient.post<Utente>(apiURL, { email: email, password: password })
        .pipe(
          tap(response => {
            console.log('Ricevuta risposta ', response);
            if (!response) throw new Error("Token di autorizzazione assente");
          })
        )
    );
  }
}
