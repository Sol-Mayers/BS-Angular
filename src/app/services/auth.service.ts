import { Injectable } from '@angular/core';
import { loginFormFields } from '../domain/loginFormFields.interface';
import { EncryptionService } from './encryption.service';

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
  }

  public logout(): void {
    console.log(
      `Выход ${JSON.parse(localStorage.getItem('userInfo') || '').email}`
    );
    localStorage.removeItem('userInfo');
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('userInfo') !== null;
  }

  public getUserInfo(): void {
    console.log('item is updated');
  }
}
