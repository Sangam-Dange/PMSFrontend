import { Component, OnInit } from '@angular/core';
import { Supplier } from './Supplier';
import { SuppliersService } from './services/suppliers.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss'],
})
export class SuppliersListComponent implements OnInit {
  title: string = 'Suppliers';
  supplierList: Supplier[] = [];

  private readonly notifier: NotifierService;

  constructor(
    private supplierServices: SuppliersService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.getSupplier();
  }

  getSupplier() {
    this.supplierServices.getSuppliers().subscribe((supplier) => {
      this.supplierList = supplier;
    });
  }

  deleteSupplier(id?: number) {
    this.supplierServices.removeSupplier(id).subscribe((response) => {
      this.notifier.notify('error', 'Successfully Deleted Supplier');
      this.supplierList = this.supplierList.filter((item) => item.id !== id);
    });
  }
}
