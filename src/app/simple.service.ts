import { inject, Injectable, signal } from '@angular/core';
import { UserInfo } from './user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',

})
export class SimpleService {

  constructor() { }
  public currentUserInfoSignal = signal<UserInfo[] | null>(null);
  private httpClient = inject(HttpClient);


  saveUserInfo(userInfo: UserInfo) {
    this.httpClient.post(`${environment.apiUrl}/users`, userInfo).subscribe({
      next: (response) => {
        console.log('User info saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving user info:', error);
      }
    })
  }

  getUserInfo() {
    this.httpClient.get<UserInfo[]>(`${environment.apiUrl}/users`).subscribe({
      next: (response) => {
        console.log('User info retrieved successfully:', response);
        this.currentUserInfoSignal.set(response);
      },
      error: (error) => {
        console.error('Error retrieving user info:', error);
      }
    });
  }
}
