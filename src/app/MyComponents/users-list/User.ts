export interface User {
  id?: number;
  name: string;
  contact: string;
  email: string;
  requestedFor: string;
  isAdmin?: boolean;
  isSuperAdmin?:boolean;
}
