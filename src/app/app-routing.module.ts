import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './MyComponents/login-page/login-page.component';
import { SignupPageComponent } from './MyComponents/signup-page/signup-page.component';
import { LandingPageComponent } from './MyComponents/landing-page/landing-page.component';
import { ErrorPageComponent } from './MyComponents/error-page/error-page.component';
import { AddSupplierComponent } from './MyComponents/suppliers-list/add-supplier/add-supplier.component';
import { SuppliersListComponent } from './MyComponents/suppliers-list/suppliers-list.component';
import { DrugListComponent } from './MyComponents/drug-list/drug-list.component';
import { CheckoutPageComponent } from './MyComponents/checkout-page/checkout-page.component';
import { DrugActionsComponent } from './MyComponents/drug-list/drug-actions/drug-actions.component';
import { OrderConfirmedPageComponent } from './MyComponents/order-confirmed-page/order-confirmed-page.component';
import { OrderListComponent } from './MyComponents/order-list/order-list.component';
import { OrderDetailsComponent } from './MyComponents/order-list/order-details/order-details.component';
import { UsersListComponent } from './MyComponents/users-list/users-list.component';
import { UnauthorizedPageComponent } from './MyComponents/unauthorized-page/unauthorized-page.component';
import { LoginGuard } from './gurads/login.guard';
import { OrderDetailPdfComponent } from './MyComponents/order-list/order-detail-pdf/order-detail-pdf.component';
import { AddressPageComponent } from './MyComponents/address-page/address-page.component';

const routes: Routes = [
  {
    path: 'address',
    component: AddressPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent,
    canActivate: [LoginGuard],
  },
  { path: 'users', component: UsersListComponent, canActivate: [LoginGuard] },
  {
    path: 'orders/orderpdf/:id',
    component: OrderDetailPdfComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'orders/orderdetails/:id',
    component: OrderDetailsComponent,
    canActivate: [LoginGuard],
  },
  { path: 'orders', component: OrderListComponent, canActivate: [LoginGuard] },
  {
    path: 'orderconfirmed',
    component: OrderConfirmedPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'editdrug/:id',
    component: DrugActionsComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'adddrug',
    component: DrugActionsComponent,
    canActivate: [LoginGuard],
  },
  { path: 'drugs', component: DrugListComponent, canActivate: [LoginGuard] },
  {
    path: 'addsupplier',
    component: AddSupplierComponent,
    canActivate: [LoginGuard],
  },
  { path: 'editsupplier/:id', component: AddSupplierComponent },
  {
    path: 'suppliers',
    component: SuppliersListComponent,
    canActivate: [LoginGuard],
  },
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
