export interface CartItem {
  drug_id: number;
  drug_name: string;
  price: number;
  quantity: number;
  selectedQuantity: number;
  subTotal: number;
  supplierDetailId: number;
}
