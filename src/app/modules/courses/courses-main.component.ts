import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';

@Component({
  selector: 'app-courses-main',
  templateUrl: './courses-main.component.html',
  styleUrls: ['./courses-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesMainComponent implements OnInit, OnDestroy {
  constructor(
    private readonly breadcrumbService: BreadcrumbsService,
    private readonly router: Router
  ) {}

  private sub?: Subscription;
  breadcrumbs: string[] = [];

  ngOnInit(): void {
    const currentBreadcrumbs = this.breadcrumbService.getCurrentBreadcrumbs();
    this.breadcrumbs = [...currentBreadcrumbs];

    this.sub = this.breadcrumbService.onEvent().subscribe(() => {
      this.getBreadcrumbs();
    });

    this.sub.add(
      this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe((e: NavigationEnd) => {
          const url = e.urlAfterRedirects;

          if (url === '/courses') {
            this.breadcrumbs = [''];
          }
        })
    );
  }

  private getBreadcrumbs() {
    const currentBreadcrumbs = this.breadcrumbService.getCurrentBreadcrumbs();
    this.breadcrumbs = [...currentBreadcrumbs];
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
