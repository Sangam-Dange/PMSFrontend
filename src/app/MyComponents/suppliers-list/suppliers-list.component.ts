import { Component, OnInit } from '@angular/core';
import { Supplier } from './Supplier';
import { SuppliersService } from './services/suppliers.service';
import { NotifierService } from 'angular-notifier';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../users-list/User';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss'],
})
export class SuppliersListComponent implements OnInit {
  title: string = 'Suppliers';
  supplierList: Supplier[] = [];
  currentUser!: User;
  private readonly notifier: NotifierService;

  constructor(
    private supplierServices: SuppliersService,
    private userServices: UsersService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
    this.userServices.getUserValue().subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.getSupplier();
  }

  getSupplier() {
    this.supplierServices.getSuppliers().subscribe({
      next: (supplier) => {
        this.supplierList = supplier;
      },
      error: (error) => {
        this.notifier.notify(
          'error',
          'Sorry! You don\'t have authority to access this page'
        );
      },
    });
  }

  deleteSupplier(id?: number) {
    this.supplierServices.removeSupplier(id).subscribe({
      next: (response) => {
        this.notifier.notify('error', 'Successfully Deleted Supplier');
        this.supplierList = this.supplierList.filter((item) => item.id !== id);
      },
      error: (error) => {
        this.notifier.notify('error', error.error);
      },
    });
  }
}
