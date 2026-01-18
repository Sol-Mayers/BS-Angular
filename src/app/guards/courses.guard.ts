import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
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
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userIsLoggedin = this.AuthService.isAuthenticated();

    if (userIsLoggedin) {
      return true;
    } else {
      return this.router.createUrlTree(['login'], {
        queryParams: { returnUrl: state.url },
      });
    }
  }
}
