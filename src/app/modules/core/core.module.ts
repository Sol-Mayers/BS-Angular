import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ShowMoreButtonComponent } from './components/show-more-button/show-more-button.component';
import { ButtonModule } from 'primeng/button';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    NotFoundComponent,
    ShowMoreButtonComponent,
    NotFoundPageComponent,
  ],
  imports: [CommonModule, ButtonModule, RouterModule],
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
