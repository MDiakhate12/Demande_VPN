import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { GenericService } from '../services/generic.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  opened: boolean = false;

  users: User[];
  protocoles: Protocole[];
  applications: Application[];

  demande = new Demande();

  constructor(private demandeService: DemandeService, private genericService: GenericService) {
    this.users = [];
    this.protocoles = [];
    this.applications = [];
    console.log(this.applications);
  }

  ngOnInit() {
    this.genericService.init(this);
  }

  getDemandeWithId(id: number) {
    this.demandeService.getDemandeWithId(id).subscribe(
      data => {
        console.log(id);
        console.log(data);
        this.demande = this.demande.deserialize(data);
        console.log(this.demande);
      }
    );
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
