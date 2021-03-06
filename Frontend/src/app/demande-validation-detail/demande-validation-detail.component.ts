import { Component, OnInit } from '@angular/core';
import { DemandeService } from '../services/demande.service';
import { Demande } from '../models/demande.model';
import { User } from '../models/user.model';
import { Protocole } from '../models/protocole.model';
import { Application } from '../models/application.model';
import { GenericService } from '../services/generic.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demande-validation-detail',
  templateUrl: './demande-validation-detail.component.html',
  styleUrls: ['./demande-validation-detail.component.css']
})

export class DemandeValidationDetailComponent implements OnInit {

  users: User[] = [];;
  protocoles: Protocole[] = [];;
  applications: Application[] = [];;
  demande: Demande = new Demande();
  progress: number = 0;
  statuses = this.demandeService.STATUS;
  checked = false;

  constructor(private demandeService: DemandeService, private genericService: GenericService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.genericService.init(this);
    let id = this.route.snapshot.paramMap.get('id');
    this.getDemandeWithId(id);
    this.demande.status_demande == 'statuses[3]' ? this.checked = true : this.checked = false;

  }

  // status2Progress() {
  //   console.log("status demande : ", this.demande.status_demande);
  //   return Math.round(100 / (this.statuses.length) * (this.statuses.indexOf(this.demande.status_demande) + 2));
  //   // this.progress = Math.round(100/(this.statuses.length) * (this.statuses.indexOf(this.demande.status_demande) + 3));
  // }



  getDemandeWithId(id) {
    this.demandeService.getDemandeWithId(id).subscribe(
      async response => {
        // this.demande = this.demande.deserialize(response);
        this.demande = response.body
        let demande = Promise.resolve(this.demande);
        console.log("demande : ", this.demande);
        console.log("demandePromise : ", demande);
        console.log("response : ", response);
        this.progress = Math.round(100 / (this.statuses.length - 3) * (this.statuses.indexOf((await demande).status_demande) + 1));
        console.log("progress : ", this.progress);
      }
    );
  }
}
