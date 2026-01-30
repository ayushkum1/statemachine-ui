import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Permission } from '../models/permission.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  // TEMP: hardcoded user, will come from backend later
  private currentUser: User = {
    id: 'u-1',
    name: 'Demo User',
    role: Role.ADMIN,
    permissions: [
      Permission.VIEW_DASHBOARD,
      Permission.VIEW_WORKFLOWS,
      Permission.VIEW_REPORTS,
      Permission.CREATE_WORKFLOW,
      Permission.EDIT_WORKFLOW,
      Permission.ADMIN_ACCESS,
    ],
  };

  getUser(): User {
    return this.currentUser;
  }

  hasPermission(permission: Permission): boolean {
    return this.currentUser.permissions.includes(permission);
  }

  isAdmin(): boolean {
    return this.currentUser.role === Role.ADMIN;
  }
}
