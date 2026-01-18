import { Injectable } from '@angular/core';
import { loginFormFields } from '../domain/loginFormFields.interface';
import { EncryptionService } from './encryption.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly Encription: EncryptionService) {}

  private readonly hashPassword = (loginFormFields: loginFormFields) => {
    return this.Encription.encryptData(loginFormFields.passwordText);
  };
  private readonly token = () => {
    return this.Encription.generateToken();
  };

  // Превращаем флаг авторизации в BehaviorSubject
  private readonly _isAuthSubject = new BehaviorSubject<boolean>(
    this.checkInitialAuth()
  );
  // Публичный observable для подписки
  public readonly isAuth$: Observable<boolean> =
    this._isAuthSubject.asObservable();

  // Текущее значение можно получить через свойство value
  public get isAuth(): boolean {
    return this._isAuthSubject.value;
  }

  private checkInitialAuth(): boolean {
    return localStorage.getItem('userInfo') !== null;
  }

  public login(loginFormFields: loginFormFields): void {
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

    const userInfo = {
      email: loginFormFields.emailText,
      password: hashPassword,
      token: token,
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log('Выполнен вход в систему');

    // Обновляем состояние авторизации
    this._isAuthSubject.next(true);
  }

  public logout(): void {
    const current = localStorage.getItem('userInfo');
    if (current) {
      const parsed = JSON.parse(current);
      console.log(`Выход ${parsed.email}`);
    } else {
      console.log('Выход: пользователь не был авторизован');
    }
    localStorage.removeItem('userInfo');

    // Обновляем состояние авторизации
    this._isAuthSubject.next(false);
  }

  public isAuthenticated(): boolean {
    return this._isAuthSubject.value;
  }

  public getUserInfo(): void {
    console.log('item is updated');
  }
}
