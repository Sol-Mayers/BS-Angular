import { Injectable } from '@angular/core';
import {
  loginFormFields,
  loginFormInput,
} from '../domain/loginFormFields.interface';
import { EncryptionService } from './encryption.service';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { nanoid } from 'nanoid';

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

  currentUser: string | null = localStorage.getItem('coursesUserToken')!;

  // начальное значение можно задать любое
  private _userFields$ = new BehaviorSubject<string>(
    localStorage.getItem('coursesUserToken')!
  );

  // публичный поток для подписки
  public readonly value$: Observable<string> = this._userFields$
    .asObservable()
    .pipe(distinctUntilChanged());

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

    localStorage.setItem('coursesUserToken', token);
    this.httpClient
      .post<loginFormFields>(`${this.mainUrl}/users`, userInfo)
      .subscribe({
        next: (data) => console.log(data),
      });

    // Обновляем состояние авторизации
    this.currentUser = token;
    this._userFields$.next(token);
  }

  public logout(id: string): void {
    this.httpClient
      .delete<loginFormFields>(`${this.mainUrl}/users/${id}`)
      .subscribe({
        next: (user) => {
          console.log(user);
          console.log(`Выход ${user.firstName}`);
        },
        error: (err) => console.log(`Ошибка при выходе, ${err}`),
      });

    localStorage.removeItem('coursesUserToken');

    // Обновляем состояние авторизации
    this.currentUser = null;
    this._userFields$.next('');
  }

  public getUserInfo(): Observable<loginFormFields> {
    return this.httpClient.get<loginFormFields[]>(`${this.mainUrl}/users`).pipe(
      map((users) => {
        return users.filter((user) => user.fakeToken == this.currentUser)[0];
      })
    );
  }

  getValue(): Observable<string> {
    return this.value$;
  }
}
