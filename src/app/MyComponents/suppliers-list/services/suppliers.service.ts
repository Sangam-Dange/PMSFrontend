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

  getSuppliers() {
    return this.http.get<Supplier[]>('/api/SupplierDetails');
  }
  getSupplierById(id: string) {
    return this.http.get<Supplier>('/api/SupplierDetails/' + id);
  }
  putSupplierById(id: string, editedSupplier: Supplier) {
    return this.http.put<Supplier>(
      '/api/SupplierDetails/' + id,
      editedSupplier
    );
  }
  addSupplier(newSupplier: Supplier) {
    return this.http.post('/api/SupplierDetails', newSupplier);
  }
  removeSupplier(id?: number) {
    return this.http.delete('/api/SupplierDetails/' + id);
  }
}
