import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, of, Subject, Subscription, takeUntil } from 'rxjs';
import { loginFormFields } from 'src/app/domain/loginFormFields.interface';
import { Users } from 'src/app/domain/users.interface';
import { user } from 'src/app/mock/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private readonly AuthService: AuthService) {}
  currentUser: Observable<loginFormFields> | null = null;

  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.AuthService.value$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.currentUser = this.AuthService.getUserInfo();
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  logout(id: string): void {
    this.AuthService.logout(id);
  }
}
