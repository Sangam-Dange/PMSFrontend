import { Component, OnInit } from '@angular/core';
import { Supplier } from './Supplier';
import { SuppliersService } from './services/suppliers.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss'],
})
export class SuppliersListComponent implements OnInit {
  title: string = 'Suppliers';
  supplierList: Supplier[] = [];
  alertCondition: boolean = false;
  message!: string;
  constructor(private supplierServices: SuppliersService) {}

  ngOnInit(): void {
    this.getSupplier();
  }
  getSupplier() {
    this.supplierServices.getSuppliers().subscribe((supplier) => {
      console.log(supplier);
      this.supplierList = supplier;
    });
  }

  deleteSupplier(id?: number) {
    this.supplierServices.removeSupplier(id).subscribe((response) => {
      this.alertCondition = true;
      this.message = 'Successfully Deleted Supplier';
      this.supplierList = this.supplierList.filter((item) => item.id !== id);
    });
  }
}
