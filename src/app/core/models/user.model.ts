import { Role } from './role.model';
import { Permission } from './permission.model';

export interface User {
  id: string;
  name: string;
  role: Role;
  permissions: Permission[];
}
