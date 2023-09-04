import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Supplier } from '../Supplier';
import { LocalStorageToken } from 'src/app/localstorage.token';
import { AuthHeaderService } from 'src/app/services/auth-header.service';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}
  // baseUrl: string = 'https://pms-webapi.azurewebsites.net';
  baseUrl:string = "https://localhost:7051"
  getSuppliers() {
    return this.http.get<Supplier[]>(this.baseUrl + '/api/SupplierDetails');
  }
  getSupplierById(id: string) {
    return this.http.get<Supplier>(this.baseUrl + '/api/SupplierDetails/' + id);
  }
  putSupplierById(id: string, editedSupplier: Supplier) {
    return this.http.put<Supplier>(
      this.baseUrl + '/api/SupplierDetails/' + id,
      editedSupplier
    );
  }
  addSupplier(newSupplier: Supplier) {
    return this.http.post(this.baseUrl + '/api/SupplierDetails', newSupplier);
  }
  removeSupplier(id?: number) {
    return this.http.delete(this.baseUrl + '/api/SupplierDetails/' + id);
  }
}
