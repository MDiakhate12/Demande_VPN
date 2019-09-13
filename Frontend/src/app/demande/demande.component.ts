import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {

  opened: boolean =false;

  users = [
    {'username':'Deme'},
    {'username':'Diahate'},
    {'username':'Gaye'}
  ]
  protocoles = [
    'HTTP',
    'HTTPS',
    'TCP',
    'IP',
    'UDP'
  ]

  applications = [
    'Geoprobe',
    'Otarie'
  ]

  demande = {
    objet: null,
    description: null,
    beneficiaire: null,
    date_expiration: null,
    applications: null,
    protocoles: null
  }
  

  constructor(private demandeService: DemandeService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.demande.applications = [1];
    this.demande.beneficiaire = 1;
    this.demande.protocoles = [1, 2];

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
