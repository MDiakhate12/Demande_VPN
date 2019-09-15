import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { GenericService } from '../services/generic.service';

@Component({
  selector: '#app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  public isOpen: boolean = false;

  users: User[]= [];;
  protocoles: Protocole[]= [];;
  applications: Application[]= [];;
  demande: Demande = new Demande();

  constructor(private demandeService: DemandeService, private genericService: GenericService) {
    console.log(this.applications);
  }

  ngOnInit() {
    this.genericService.init(this);
  }

  onSubmit() {

    this.demandeService.sendDemande(this.demande).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('ERREUR : ' + error);
      }
    );
  }

}
