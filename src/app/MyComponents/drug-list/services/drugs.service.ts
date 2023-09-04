import { Injectable } from '@angular/core';
import { Drug } from '../Drug';
import { HttpClient } from '@angular/common/http';
import { AuthHeaderService } from 'src/app/services/auth-header.service';
import { NewDrug } from '../NewDrug';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrugsService {
  drugs: Drug[] = [];
  constructor(private http: HttpClient) {}
  // baseUrl:string = "https://pms-webapi.azurewebsites.net";
  baseUrl:string = "https://localhost:7051";
  getAllDrugs() {
    return this.http.get<Drug[]>(this.baseUrl + '/api/Drugs').pipe(shareReplay(1));
  }
  getDrugById(drugId: string) {
    return this.http.get<Drug>(this.baseUrl + `/api/Drugs/${drugId}`);
  }
  editDrugById(drugId: string, newDrug: NewDrug) {
    return this.http.put<Drug>(this.baseUrl + `/api/Drugs/${drugId}`, newDrug);
  }
  postDrug(newDrug: NewDrug) {
    return this.http.post(this.baseUrl + '/api/Drugs', newDrug);
  }

  deleteDrug(drugId: number) {
    return this.http.delete(`/api/Drugs/${drugId}`);
  }
}
