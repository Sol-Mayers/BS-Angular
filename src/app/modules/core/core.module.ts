import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShowMoreButtonComponent } from './components/show-more-button/show-more-button.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    NotFoundComponent,
    ShowMoreButtonComponent,
  ],
  imports: [CommonModule, ButtonModule],
  exports: [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    NotFoundComponent,
    ShowMoreButtonComponent,
  ],
})
export class CoreModule {}
