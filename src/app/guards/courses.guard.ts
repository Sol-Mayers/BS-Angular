import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesGuard implements CanActivate {
  constructor(
    private readonly AuthService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const returnUrl = state.url;

    return this.AuthService.getValue().pipe(
      map((isAuth) =>
        isAuth
          ? true
          : this.router.createUrlTree(['login'], { queryParams: { returnUrl } })
      )
    );
  }
}
