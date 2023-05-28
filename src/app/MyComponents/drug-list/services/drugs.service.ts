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
  constructor(
    private http: HttpClient,
    private headerService: AuthHeaderService
  ) {}

  getAllDrugs() {
    return this.http.get<Drug[]>('/api/Drugs').pipe(shareReplay(1));
  }
  getDrugById(drugId: string) {
    return this.http.get<Drug>(`/api/Drugs/${drugId}`);
  }
  editDrugById(drugId: string, newDrug: NewDrug) {
    return this.http.put<Drug>(`/api/Drugs/${drugId}`, newDrug);
  }
  postDrug(newDrug: NewDrug) {
    return this.http.post('/api/Drugs', newDrug);
  }

  deleteDrug(drugId: number) {
    return this.http.delete(
      `/api/Drugs/${drugId}`,
      this.headerService.getHeaderValue()
    );
  }
}
