import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Supplier } from '../Supplier';
import { LocalStorageToken } from 'src/app/localstorage.token';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(
    private http: HttpClient,
    @Inject(LocalStorageToken) private localStorage: any
  ) {}

  header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.localStorage.getItem('token')}`
    ),
  };
  getSuppliers() {
    return this.http.get<Supplier[]>('/api/SupplierDetails', this.header);
  }
  getSupplierById(id: string) {
    return this.http.get<Supplier>('/api/SupplierDetails/' + id, this.header);
  }
  putSupplierById(id: string, editedSupplier: Supplier) {
    return this.http.put<Supplier>(
      '/api/SupplierDetails/' + id,
      editedSupplier,
      this.header
    );
  }
  addSupplier(newSupplier: Supplier) {
    return this.http.post('/api/SupplierDetails', newSupplier, this.header);
  }
  removeSupplier(id?: number) {
    return this.http.delete('/api/SupplierDetails/' + id, this.header);
  }
}
