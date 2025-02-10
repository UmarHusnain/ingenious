import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IUser } from '../Interfaces/IUser';
@Injectable({
    providedIn: 'root'
  })
 export class UserService {
   private apiUrl =` ${environment.baseApiUrl}${environment.ApiUrl}Account`;
   constructor(private http: HttpClient) { } 

   getUsersByRole(role: string): Observable<IUser[]> {
     const params = new HttpParams().set('role', role);
     return this.http.get<{ success: boolean; message: string; data: IUser[] }>(`${this.apiUrl}/GetUsersByRole`, { params })
       .pipe(
         map(response => response.data)
       );
   }
 
 }
  