// tslint:disable:no-bitwise
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';


const TOKEN_PREFIX = 'TOKEN';
const LANGUAGE_PREFIX = 'LANGUAGE';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated$ = new BehaviorSubject(false);
  private download$ = new BehaviorSubject(null);
  private token$ = new BehaviorSubject('');
  private username$ = new BehaviorSubject('');

  private language$ = new BehaviorSubject('es');

  constructor(
    private localStorageService: LocalStorageService
  ) {
    const lang = this.localStorageService.getItem(LANGUAGE_PREFIX);

    if (lang) {
      this.language$.next(lang);
    }

    this.language$.subscribe(language => {
      this.localStorageService.setItem(LANGUAGE_PREFIX, language);
    });

  }

  public getLanguageAsync(): Observable<string> {
    return this.language$.asObservable();
  }

  public getLanguage(): string {
    return this.language$.value;
  }

  public setLanguage(language: string): void {
    return this.language$.next(language);
  }

  public getUsername(): Observable<string> {
    return this.username$.asObservable();
  }



  public getToken(): string {
    return this.localStorageService.getItem(TOKEN_PREFIX);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  public authenticated(): boolean {
    return this.isAuthenticated$.value && (this.download$.value !== null);
  }

  public login(token: string): any {

  }

  public logout(): void {
    this.localStorageService.removeItem(TOKEN_PREFIX);
    this.isAuthenticated$.next(false);
    this.username$.next('');
    this.download$.next(null);
  }

  private urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        // tslint:disable-next-line:no-string-throw
        throw 'Illegal base64url string!';
      }
    }
    return this.b64DecodeUnicode(output);
  }

  // credits for decoder goes to https://github.com/atk
  private b64decode(str: string): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if (str.length % 4 === 1) {
      throw new Error(
        `'atob' failed: The string to be decoded is not correctly encoded.`
      );
    }

    for (
      // initialize result and counters
      let bc = 0, bs: any, buffer: any, idx = 0;
      // get next character
      (buffer = str.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      (
        (bs = bc % 4 ? bs * 64 + buffer : buffer),
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4
      )
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }

  private b64DecodeUnicode(str: any) {
    return decodeURIComponent(
      Array.prototype.map
        .call(this.b64decode(str), (c: any) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  }

  public decodeToken(token: string = this.token$.value) {
    if (token === null) {
      return null;
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error(`The inspected token doesn\'t appear to be
      a JWT. Check to make sure it has three parts and see https://jwt.io for more.`);
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token.');
    }

    return JSON.parse(decoded);
  }

  public getTokenExpirationDate(token: string = this.token$.value): Date | null {
    let decoded: any;
    decoded = this.decodeToken(token);

    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  public isTokenExpired(token: string = this.token$.value, offsetSeconds?: number): boolean {
    if (token === null || token === '') {
        return true;
    }

    const date = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;

    if (date === null) {
      return true;
    }

    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }

}
