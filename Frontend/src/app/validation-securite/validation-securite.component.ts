import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { Demande } from '../models/demande.model';
import { GenericService } from '../services/generic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validation-securite',
  templateUrl: './validation-securite.component.html',
  styleUrls: ['./validation-securite.component.css']
})

export class ValidationSecuriteComponent implements OnInit {

  panelOpenState = true;
  step = 0;

  users: User[] = [];;
  protocoles: Protocole[] = [];;
  applications: Application[] = [];;
  demandes: Demande[] = new Array<Demande>();
  username: string;

  constructor(private demandeService: DemandeService, private genericService: GenericService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.genericService.init(this);
    this.initDemandeEnAttenteSecurite();
    console.log(this.router);
    console.log(this.demandes);
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  initDemandeEnAttenteSecurite() {
    this.demandeService.getDemandeEnAttenteSecuriteOf().subscribe(response => {
      this.demandes = response.body;
    }
    );
  }

  validerDemande(id: number) {
    if (confirm("Confirmez vous la validation ?")) {
      this.demandeService.validateDemandeWithId(id).subscribe(
        data => {
          this.initDemandeEnAttenteSecurite();
          console.log(data);
        },
        error => {
          console.error(error);
        }
      )
    }
  }


  refuserDemande(id: number) {

  }

}
