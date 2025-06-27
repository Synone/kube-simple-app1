import { Component, computed, signal, SimpleChange } from "@angular/core";
import { SimpleService } from "../../simple.service";

@Component({
  selector: 'app-login-info',
  imports: [],
  templateUrl: './login-info.component.html',
  styleUrl: './login-info.component.css'
})
export class LoginInfoComponent {
  constructor(private simpleService: SimpleService) {
    this.simpleService.getUserInfo();
  }
  userInfo = computed(() => this.simpleService.currentUserInfoSignal());
}
