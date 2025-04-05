import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from 'src/app/core/services/guards/admin.guard';
import { SecureComponent } from './secure.component';

const routes: Routes = [
  { path: '', component: SecureComponent },
  { path: 'dashboard', loadChildren: () => import('../../modules/afterLogin/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [adminGuard] },
  { path: 'department', loadChildren: () => import('../../modules/afterLogin/department/department.module').then(m => m.DepartmentModule) },
  { path: 'employee', loadChildren: () => import('../../modules/afterLogin/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'leaves', loadChildren: () => import('../../modules/afterLogin/leaves/leaves.module').then(m => m.LeavesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
