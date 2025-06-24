import { Injectable, signal } from '@angular/core';
import { UserInfo } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class SimpleService {

  constructor() { }
  currentUserInfoSignal = signal<UserInfo | null>(null);
}
