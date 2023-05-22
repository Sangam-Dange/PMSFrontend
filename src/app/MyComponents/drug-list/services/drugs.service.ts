import { Injectable } from '@angular/core';
import { Drug } from '../Drug';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DrugsService {
  drugs: Drug[] = [];
  constructor(private http: HttpClient) {}

  getAllDrugs() {
    return this.http.get<Drug[]>('/api/Drugs');
  }
}
