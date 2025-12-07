import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private randomString(length = 10) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const array = new Uint8Array(length);

    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      const idx = array[i] % chars.length;
      result += chars.charAt(idx);
    }
    return result;
  }

  private readonly key = this.randomString();

  // Зашифровать строку
  encryptData(plainText: string, key?: string): string {
    const k = key ?? this.key;
    const encrypted = CryptoJS.AES.encrypt(
      plainText,
      CryptoJS.enc.Utf8.parse(k),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encrypted.toString();
  }

  // Расшифровать строку
  decryptData(cipherText: string, key?: string): string {
    const k = key ?? this.key;
    const bytes = CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(k), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  // Формирование токена. Как временный пример!!!
  generateToken(length = 50): string {
    const token = this.randomString(length);
    return token;
  }

  constructor() {}
}
