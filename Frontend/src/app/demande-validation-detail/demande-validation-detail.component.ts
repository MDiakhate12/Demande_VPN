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

  constructor(private demandeService: DemandeService, private genericService: GenericService, private router: Router, private route: ActivatedRoute) {
    console.log(this.applications);
    console.log(this.route);
    console.log(this.router);
    console.log(this.statuses);
  }

  ngOnInit() {
    this.genericService.init(this);
     let id = this.route.snapshot.paramMap.get('id');
     this.getDemandeWithId(id);
     this.status2Progress();
     console.log("progress : ",this.progress);
     document.getElementById('mat-tab-body-content').style.overflow = "hidden";
     console.log(document.getElementById('mat-tab-body-content'));
  }

  status2Progress() {
    this.progress = Math.round(100/(this.statuses.length) * (this.statuses.indexOf(this.demande.status_demande) + 2));
    // this.progress = Math.round(100/(this.statuses.length) * (this.statuses.indexOf(this.demande.status_demande) + 3));
  }



  getDemandeWithId(id) {
    this.demandeService.getDemandeWithId(id).subscribe(
      data => {
        console.log(id);
        console.log(data);
        this.demande = this.demande.deserialize(data);
        console.log(this.demande);
      }
    );
  }
}
