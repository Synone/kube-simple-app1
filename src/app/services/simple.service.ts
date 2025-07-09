import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogInfo } from '../models/dog';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',

})
export class SimpleService {

  constructor() { }
  public dogSignal = signal<DogInfo[] | null>(null);
  private httpClient = inject(HttpClient);


  saveDogInfo(dog: DogInfo) {
    return this.httpClient.post(`${environment.apiUrl}/dogs`, dog)
  }

  getDogInfo() {
    this.httpClient.get<DogInfo[]>(`${environment.apiUrl}/dogs`).subscribe({
      next: (response) => {
        console.log('User info retrieved successfully:', response);
        this.dogSignal.set(response);
      },
      error: (error) => {
        console.error('Error retrieving user info:', error);
      }
    });
  }

  deleteDogInfo(id: string) {
    this.httpClient.delete(`${environment.apiUrl}/dogs/${id}`).subscribe({
      next: (response) => {
        console.log('User info deleted successfully:', response);
        // Optionally, you can refresh the dog info after deletion
        this.getDogInfo();
      },
      error: (error) => {
        console.error('Error deleting user info:', error);
      }
    });
  }
}
