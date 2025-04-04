import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  { path: '', component: PublicComponent },
  { path: 'home', loadChildren: () => import('../../modules/public/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('../../modules/public/login/login.module').then(m => m.LoginModule) },
  { path: 'img-upload', loadChildren: () => import('../../modules/public/img-upload/img-upload.module').then(m => m.ImgUploadModule) },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
