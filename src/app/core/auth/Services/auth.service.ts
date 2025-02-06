// registration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRegister } from '../Interfaces/IRegister';
import { LocalStorageService } from './localStorage.service';
import { environment } from '../../../../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private apiUrl =` ${environment.baseUrl}Account`

  constructor(private http: HttpClient, private localStorageService:LocalStorageService) {}

  register(registrationData: IRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registrationData);
  }
  login(userName: string, password: string): Observable<any> {
    const body = { userName, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }


  // ******* Other funcations ******* //

  public getAuthTokenWithLoginData() {
    const credentials = this.localStorageService.getTokenWithLoginedData();

    if (!credentials) {
      return null;
    }

    return credentials.token;
  }


  public getAspNetUserId(): string {
    const credentials = this.localStorageService.getTokenWithLoginedData();
    return credentials.aspNetUserId || '';
  }

  public getUserRole(): string {
    const credentials = this.localStorageService.getTokenWithLoginedData();
    return credentials.role || '';
  }

  public getUserName(): string {
    const credentials = this.localStorageService.getTokenWithLoginedData();
    return credentials.userName || '';
  }
  public getFullName(): string {
    const credentials = this.localStorageService.getTokenWithLoginedData();
    return credentials.fullName || '';
  }

  public isAuthenticated(): boolean {
    const credentials = this.localStorageService.getTokenWithLoginedData();

    if (
      credentials.token &&
      credentials.role &&
      credentials.userName
    ) {
      return true;
    }

    return false;
  }
  public isAdmin(): boolean {
    const credentials = this.localStorageService.getTokenWithLoginedData();

    if (credentials.role == 'Admin') {
      return true;
    } else {
      return false;
    }
  }
  public isCustomer(): boolean {
    const credentials = this.localStorageService.getTokenWithLoginedData();

    if (credentials.role == 'Customer') {
      return true;
    } else {
      return false;
    }
  }
  logOut() {
    this.localStorageService.clearLocalStorage();
  }
  public saveToken(token: string): void {
    const credentials = this.localStorageService.getTokenWithLoginedData();
    if (credentials) {
      // credentials.token = token;
      credentials.token = token;
      this.localStorageService.saveTokenWithLoginedData(credentials);
    }
  }
}
