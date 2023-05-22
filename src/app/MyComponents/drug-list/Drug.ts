export interface Drug {
  drug_id: Number;
  drug_name: string;
  price: Number;
  batch_id: string;
  quantity: Number;
  expiry_date: Date;
  supplierDetail: {
    id: Number;
    supplier_name: string;
    supplier_email: string;
    supplier_address: string;
    supplier_phone: string;
  };
  supplierDetailId: Number;
}
