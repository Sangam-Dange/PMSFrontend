export interface Drug {
  drug_id: number;
  drug_name: string;
  price: number;
  batch_id: string;
  quantity: number;
  expiry_date: Date;
  supplierDetail: {
    id: number;
    supplier_name: string;
    supplier_email: string;
    supplier_address: string;
    supplier_phone: string;
  };
  supplierDetailId: number;
}
