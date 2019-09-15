import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeComponent } from './demande/demande.component';
import { ValidationHierarchiqueComponent } from './validation-hierarchique/validation-hierarchique.component';
import { DemandeDetailComponent } from './demande-detail/demande-detail.component';

const routes: Routes = [
  {path: 'nouvelle-demande', component: DemandeComponent},
  {path: 'demande/:id', component: DemandeDetailComponent},
  {path: 'validation-hierarchique/:username', component:  ValidationHierarchiqueComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
