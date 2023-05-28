import { Component } from '@angular/core';
import { NewDrug } from '../NewDrug';
import { SuppliersService } from '../../suppliers-list/services/suppliers.service';
import { Supplier } from '../../suppliers-list/Supplier';
import { DrugsService } from '../services/drugs.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-drug-actions',
  templateUrl: './drug-actions.component.html',
  styleUrls: ['./drug-actions.component.scss'],
})
export class DrugActionsComponent {
  id: string = '';
  supplierList!: Supplier[];
  date: Date = new Date();
  private readonly notifier: NotifierService;
  newDrug: NewDrug = {
    drug_name: '',
    price: 0,
    batch_id: '',
    quantity: 0,
    expiry_date: this.date,
    supplierDetailId: null,
  };

  constructor(
    private supplierServices: SuppliersService,
    private drugServices: DrugsService,
    notifierService: NotifierService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.notifier = notifierService;
    this.supplierServices.getSuppliers().subscribe((res) => {
      this.supplierList = res;
    });
  }

  ngOnInit() {
    if (this.activeRoute.snapshot.paramMap.get('id') !== null) {
      this.id += this.activeRoute.snapshot.paramMap.get('id');
      this.drugServices.getDrugById(this.id).subscribe((data) => {
        this.newDrug = data['value'];
      });
    }
  }

  drugActions() {
    if (this.activeRoute.snapshot.paramMap.get('id') == null) {
      this.drugServices.postDrug(this.newDrug).subscribe({
        next: (val) => {
          this.notifier.notify('success', 'Successfully Added Drug');
          this.newDrug = {
            drug_name: '',
            price: 0,
            batch_id: '',
            quantity: 0,
            expiry_date: this.date,
            supplierDetailId: null,
          };
          setTimeout(() => {
            this.router.navigate(['/drugs']);
          }, 2000);
        },
        error: (error) => {
          this.notifier.notify(
            'error',
            "Sorry! You don't have authority to access this page"
          );
        },
      });
    } else {
      this.drugServices.editDrugById(this.id, this.newDrug).subscribe({
        next: (res) => {
          this.notifier.notify('success', 'Successfully Edited Drug');
          setTimeout(() => {
            this.router.navigate(['/drugs']);
          }, 2000);
        },
        error: (error) => {
          this.notifier.notify(
            'error',
            "Sorry! You don't have authority to access this page"
          );
        },
      });
    }
  }
}
