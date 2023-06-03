interface OrderDetails {
  drugId: number;
  drug_quantity: number;
  sub_total: number;
}

export interface PlaceOrder {
  createOrderDto: {
    total: number;
    userId: number;
    totalItems:number;
    order_date: Date;
    pickup_date?: Date;
  };
  orderDetails: OrderDetails[];
}
