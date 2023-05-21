import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './MyComponents/login-page/login-page.component';
import { SignupPageComponent } from './MyComponents/signup-page/signup-page.component';
import { LandingPageComponent } from './MyComponents/landing-page/landing-page.component';
import { ErrorPageComponent } from './MyComponents/error-page/error-page.component';
import { AddSupplierComponent } from './MyComponents/suppliers-list/add-supplier/add-supplier.component';
import { SuppliersListComponent } from './MyComponents/suppliers-list/suppliers-list.component';

const routes: Routes = [
  { path: 'addsupplier', component: AddSupplierComponent },
  { path: 'editsupplier/:id', component: AddSupplierComponent },
  { path: 'suppliers', component: SuppliersListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: '', component: LandingPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
