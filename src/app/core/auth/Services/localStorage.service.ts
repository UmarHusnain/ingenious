import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
export class LocalStorageService {
    private secretKey =
      '4b8e8a16b9f1e8d1b8c1f8a7d1e9f1c8b1a6d4e9f1b7a8c1f9d4b7e8a1c6f9b8';
  
    encrypt(data: any): string {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        this.secretKey
      ).toString();
    }
  
    decrypt(data: string): any {
      if (!data) {
        console.warn('Decrypt failed: No data provided.');
        return null; // Return null if data is empty
      }
      try {
        const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
      } catch (error) {
        console.error('Decrypt failed: Invalid encrypted data.', error);
        return null; // Return null if decryption or JSON parsing fails
      }
    }
  
    setItem(key: string, data: any) {
      const encryptedData = this.encrypt(data);
      localStorage.setItem(key, encryptedData);
    }
  
    getItem(key: string): any {
      const encryptedData = localStorage.getItem(key);
      if (encryptedData) {
        return this.decrypt(encryptedData);
      }
      return null;
    }
  
    // setItem(key: string, data: any) {
    //   localStorage.setItem(key, window.btoa(data));
    //   }
    //    getItem(key: string): any {
    //     const value = localStorage.getItem(key);
    //      return value ? window.atob(value) : null;
    // }
    removeItem(key: string) {
      localStorage.removeItem(key);
    }
  
    isUserLoggedIn(): boolean {
      return this.getItem('aspNetUserId') !== null;
    }
  
    isAuthenticated(): boolean {
      return (
        !!localStorage.getItem('email') && !!localStorage.getItem('password')
      );
    }
  
    getToken(): string | null {
      return localStorage.getItem('email') && sessionStorage.getItem('password');
    }
  
    saveTokenWithLoginedData(responseObj: any) {
      var token = responseObj.token ? responseObj.token : responseObj.accessToken;
      this.setItem('AccessToken', token);
      this.setItem(
        'AccessTokeExpirationTime',
        responseObj.accessTokeExpirationTime
      );
      this.setItem('RefreshToken', responseObj.refreshToken);
      this.setItem(
        'RefreshTokeExpirationTime',
        responseObj.refreshTokeExpirationTime
      );
      if (responseObj.accessToken) {
        let jwtData = responseObj.accessToken.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        if(decodedJwtData && !decodedJwtData.UserId)
        {
          decodedJwtData.UserId = decodedJwtData.AspNetUserId;
        }
        
        this.setItem('aspNetUserId', decodedJwtData.AspNetUserId);
        this.setItem('userName', decodedJwtData.UserName);
        this.setItem('fullName', decodedJwtData.FullName);
        this.setItem('isDeleted', decodedJwtData.IsDeleted);
        this.setItem('isBlocked', decodedJwtData.IsBlocked);
        //const decodedToken = jwt_decode(token);
        if (decodedJwtData && decodedJwtData.role) {
          this.setItem('role', decodedJwtData.role);
        }
      }
    }
  
    getTokenWithLoginedData() {
      // const decodeBase64 = (value: string | null): string => {
      //   return value ? window.atob(value) : ''; // Return an empty string if value is null
      // };
  
      let credentials = {
        aspNetUserId: this.getItem('aspNetUserId'),
        role: this.getItem('role'),
        userName: this.getItem('userName'),
        fullName: this.getItem('fullName'),
        isDeleted: this.getItem('isDeleted'),
        isBlocked:this.getItem('isBlocked'),
        token: this.getItem('AccessToken') || '', // Default to an empty string if null
        accessTokeExpirationTime: this.getItem('AccessTokeExpirationTime') || '',
        refreshToken: this.getItem('RefreshToken') || '',
        refreshTokeExpirationTime: this.getItem('RefreshTokeExpirationTime') || '',
      };
  
      return credentials;
    }
  
    clearLocalStorage() {
      localStorage.clear();
    }
  }