import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeComponent } from './demande/demande.component';

const routes: Routes = [
  {'path': 'demande', "component": DemandeComponent},
  // {'path': '', "redirectTo": DemandeComponent, "pathMatch": "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
