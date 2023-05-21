import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Supplier } from '../Supplier';
import { SuppliersService } from '../services/suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit {
  title: string = 'Add Supplier';
  id: string = '';
  alertCondition: boolean = false;
  message!: string;
  newSupplier: Supplier = {
    supplier_name: '',
    supplier_phone: '',
    supplier_email: '',
    supplier_address: '',
  };

  constructor(
    private supplierServices: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.activeRoute.snapshot.paramMap.get('id') !== null) {
      this.id += this.activeRoute.snapshot.paramMap.get('id');

      this.supplierServices.getSupplierById(this.id).subscribe((data) => {
        this.newSupplier = data;
      });
    }
  }
  supplierActions(f: NgForm) {
    this.alertCondition = true;
    if (this.activeRoute.snapshot.paramMap.get('id') == null) {
      this.supplierServices.addSupplier(this.newSupplier).subscribe((data) => {
        this.message = 'Successfully Added Supplier';

        setTimeout(() => {
          this.router.navigate(['/suppliers']);
        }, 2000);
      });
    } else {
      this.supplierServices
        .putSupplierById(this.id, this.newSupplier)
        .subscribe((data) => {
          this.message = 'Successfully Updated Supplier';

        });
    }
  }
}
