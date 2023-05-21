import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../Supplier';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}
  header = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidmFyYWQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY4NDM4ODQwMX0.hCmFk1e7hv73JSg-bdrWRvwsEL-jPEQ11S5h44I-tlyNHHw2NFlCfzGYH2t1QMDhNMzvV-I42tf7palGXsXr9Q`
    ),
  };
  getSuppliers() {
    return this.http.get<Supplier[]>('/api/SupplierDetails', this.header);
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
