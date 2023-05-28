export interface NewDrug {
  drug_id?: number;
  drug_name: string;
  price: number;
  batch_id: string;
  quantity: number;
  expiry_date: Date;
  supplierDetailId: number;
}
