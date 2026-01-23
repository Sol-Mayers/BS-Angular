import { Injectable } from '@angular/core';
import {
  loginFormFields,
  loginFormInput,
} from '../domain/loginFormFields.interface';
import { EncryptionService } from './encryption.service';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { nanoid } from 'nanoid';
import { Courses } from '../domain/courses.interface';
import { Users } from '../domain/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly Encription: EncryptionService,
    private readonly httpClient: HttpClient
  ) {}
  private readonly mainUrl = '/api';

  private readonly hashPassword = (loginFormFields: loginFormInput) => {
    return this.Encription.encryptData(loginFormFields.password);
  };
  private readonly token = () => {
    return this.Encription.generateToken();
  };

  currentUser: loginFormFields = JSON.parse(localStorage.getItem('userInfo')!);

  private readonly _isAuthSubject = new BehaviorSubject<boolean>(
    this.checkInitialAuth()
  );

  // начальное значение можно задать любое
  private _userFields$ = new BehaviorSubject<loginFormFields>(
    JSON.parse(localStorage.getItem('userInfo')!) as loginFormFields
  );

  // публичный поток для подписки
  public readonly value$: Observable<loginFormFields> = this._userFields$
    .asObservable()
    .pipe(distinctUntilChanged());

  public readonly isAuth$: Observable<boolean> =
    this._isAuthSubject.asObservable();

  public get isAuth(): boolean {
    return this._isAuthSubject.value;
  }

  private checkInitialAuth(): boolean {
    return localStorage.getItem('userInfo') !== null;
  }

  // Вход и сохранение данных о пользователе в базу данных.
  // Временно работает и как регистрация и как вход.
  public login(loginFormFields: loginFormInput): void {
    let hasEmptyFields = false;
    const formFields = Object.values(loginFormFields);

    for (let i = 0; i <= formFields.length - 1; i++) {
      if (formFields[i].trim() === '') {
        hasEmptyFields = true;
        break;
      }
    }

    if (hasEmptyFields) {
      // Временное оповещение о пустых полях!!!
      alert('Заполните все поля!');
      return;
    }

    const hashPassword = this.hashPassword(loginFormFields);
    const token = this.token();

    const userInfo: loginFormFields = {
      id: nanoid(5),
      firstName: loginFormFields.email,
      lastName: loginFormFields.email,
      email: loginFormFields.email,
      password: hashPassword,
      fakeToken: token,
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    this.httpClient
      .post<loginFormFields>(`${this.mainUrl}/users`, userInfo)
      .subscribe({
        next: (data) => console.log(data),
      });
    console.log('Выполнен вход в систему');

    // Обновляем состояние авторизации
    this.currentUser = userInfo;
    this._isAuthSubject.next(true);
    this._userFields$.next(userInfo);
  }

  public logout(): void {
    console.log('currentUser: ' + this.currentUser);
    this.httpClient
      .delete<loginFormFields>(`${this.mainUrl}/users/${this.currentUser.id}`)
      .subscribe({
        next: (user) => {
          console.log(user);
          console.log(`Выход ${user.firstName}`);
        },
        error: (err) => console.log(`Ошибка при выходе, ${err}`),
      });

    localStorage.removeItem('userInfo');

    // Обновляем состояние авторизации
    this._isAuthSubject.next(false);
    this._userFields$.next({} as loginFormFields);
  }

  public isAuthenticated(): boolean {
    return this._isAuthSubject.value;
  }

  public getUserInfo(): Observable<loginFormFields[]> {
    return this.httpClient
      .get<loginFormFields[]>(`${this.mainUrl}/users`)
      .pipe(
        map((users) =>
          users.filter((user) => user.fakeToken == this.currentUser.fakeToken)
        )
      );
  }

  getValue(): loginFormFields {
    return this._userFields$.getValue();
  }
}
