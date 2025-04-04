import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // ✅ Import this
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './core/services/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,NgxSpinnerModule, BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
