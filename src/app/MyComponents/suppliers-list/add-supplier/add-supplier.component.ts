import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Supplier } from '../Supplier';
import { SuppliersService } from '../services/suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit {
  title: string = 'Add Supplier';
  id: string = '';

  newSupplier: Supplier = {
    supplier_name: '',
    supplier_phone: '',
    supplier_email: '',
    supplier_address: '',
  };
  private readonly notifier: NotifierService;
  constructor(
    private supplierServices: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    if (this.activeRoute.snapshot.paramMap.get('id') !== null) {
      this.id += this.activeRoute.snapshot.paramMap.get('id');
      this.supplierServices.getSupplierById(this.id).subscribe((data) => {
        this.newSupplier = data;
      });
    }
  }
  supplierActions(f: NgForm) {
    if (this.activeRoute.snapshot.paramMap.get('id') == null) {
      this.supplierServices.addSupplier(this.newSupplier).subscribe((data) => {
        this.notifier.notify('success', 'Successfully Added Supplier');
        setTimeout(() => {
          this.router.navigate(['/suppliers']);
        }, 2000);
      });
    } else {
      this.supplierServices
        .putSupplierById(this.id, this.newSupplier)
        .subscribe((data) => {
          this.notifier.notify('success', 'Successfully Updated Supplier');
          setTimeout(() => {
            this.router.navigate(['/suppliers']);
          }, 2000);
        });
    }
  }
}
