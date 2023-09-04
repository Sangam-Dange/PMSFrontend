import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-order-detail-pdf',
  templateUrl: './order-detail-pdf.component.html',
  styleUrls: ['./order-detail-pdf.component.scss'],
})
export class OrderDetailPdfComponent {
  orderDetails!: any;
  @ViewChild('tableDiv', { static: false }) el!: ElementRef;

  constructor(
    private orderService: OrderService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderService
      .getOrderDetails(this.activeRoute.snapshot.paramMap.get('id'))
      .subscribe({
        next: (val) => {
          this.orderDetails = val;
        },
      });
  }

  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('OrderInvoice.pdf');
      },
    });
  }
}
