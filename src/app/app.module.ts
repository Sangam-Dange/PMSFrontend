import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './MyComponents/login-page/login-page.component';
import { SignupPageComponent } from './MyComponents/signup-page/signup-page.component';
import { LandingPageComponent } from './MyComponents/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './MyComponents/users-list/users-list.component';
import { UsersTableComponent } from './MyComponents/users-list/users-table/users-table.component';
import { ErrorPageComponent } from './MyComponents/error-page/error-page.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { SuppliersListComponent } from './MyComponents/suppliers-list/suppliers-list.component';
import { AddSupplierComponent } from './MyComponents/suppliers-list/add-supplier/add-supplier.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './MyComponents/alert/alert.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { HeaderComponent } from './MyComponents/header/header.component';
import { DrugListComponent } from './MyComponents/drug-list/drug-list.component';
import { DrugCardComponent } from './MyComponents/drug-list/drug-card/drug-card.component';
import { OrderService } from './services/order.service';
import { DatePipe } from '@angular/common';
import { CheckoutPageComponent } from './MyComponents/checkout-page/checkout-page.component';
import { DrugActionsComponent } from './MyComponents/drug-list/drug-actions/drug-actions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderConfirmedPageComponent } from './MyComponents/order-confirmed-page/order-confirmed-page.component';
import { OrderListComponent } from './MyComponents/order-list/order-list.component';
import { OrderDetailsComponent } from './MyComponents/order-list/order-details/order-details.component';
import { TokenInterceptor } from './services/token-interceptor';
import { UnauthorizedPageComponent } from './MyComponents/unauthorized-page/unauthorized-page.component';
import { OrderDetailPdfComponent } from './MyComponents/order-list/order-detail-pdf/order-detail-pdf.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddressPageComponent } from './MyComponents/address-page/address-page.component';
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    LandingPageComponent,
    UsersListComponent,
    UsersTableComponent,
    ErrorPageComponent,
    SuppliersListComponent,
    AddSupplierComponent,
    AlertComponent,
    HeaderComponent,
    DrugListComponent,
    DrugCardComponent,
    CheckoutPageComponent,
    DrugActionsComponent,
    OrderConfirmedPageComponent,
    OrderListComponent,
    OrderDetailsComponent,
    UnauthorizedPageComponent,
    OrderDetailPdfComponent,
    AddressPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgbModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    OrderService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
