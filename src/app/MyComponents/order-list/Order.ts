export interface Order {
  order_id: number;
  order_no: number;
  total: number;
  totalItems: number;
  user: {
    id: number;
    name: string;
    contact: string;
    email: string;
    requestedFor: string;
    isAdmin: true;
    isSuperAdmin: true;
  };
  userId: number;
  order_date: Date;
  pickup_date: Date;
}
