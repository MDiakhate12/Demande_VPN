import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeComponent } from './demande/demande.component';
import { ValidationHierarchiqueComponent } from './validation-hierarchique/validation-hierarchique.component';
import { DemandeDetailComponent } from './demande-detail/demande-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ValidationSecuriteComponent } from './validation-securite/validation-securite.component';
import { ValidationAdminComponent } from './validation-admin/validation-admin.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'nouvelle-demande', component: DemandeComponent},
  {path: 'demande/:id', component: DemandeDetailComponent},
  {path: 'validation-hierarchique/:username', component:  ValidationHierarchiqueComponent},
  {path: 'validation-securite', component:  ValidationSecuriteComponent},
  {path: 'validation-admin', component:  ValidationAdminComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
