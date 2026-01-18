import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ButtonModule } from 'primeng/button';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ButtonModule, LoginRoutingModule],
  exports: [LoginComponent],
})
export class LoginModule {}
