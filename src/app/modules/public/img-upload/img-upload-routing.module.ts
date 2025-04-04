import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImgUploadComponent } from './img-upload.component';

const routes: Routes = [{ path: '', component: ImgUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgUploadRoutingModule { }
