import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { Demande } from '../models/demande.model';
import { GenericService } from '../services/generic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validation-hierarchique',
  templateUrl: './validation-hierarchique.component.html',
  styleUrls: ['./validation-hierarchique.component.css']
})
export class ValidationHierarchiqueComponent implements OnInit {

  panelOpenState = true;
  step = 0;

  users: User[]= [];;
  protocoles: Protocole[]= [];;
  applications: Application[]= [];;
  demandes: Demande[] = new Array<Demande>();
  username: string;

  constructor(private demandeService: DemandeService, private genericService: GenericService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.genericService.init(this);
    this.initDemandeEnAttenteHierarchique();
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

  initDemandeEnAttenteHierarchique() {
    this.username = this.router.snapshot.paramMap.get("username");
    this.demandeService.getDemandeEnAttenteHierarchiqueOf(this.username).subscribe(response => {
      this.demandes = response.body;
    }
    );
  }

}
