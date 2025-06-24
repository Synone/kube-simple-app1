import { SimpleService } from "./../simple.service";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private fb: FormBuilder, private SimpleService: SimpleService, private route: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  loginForm!: FormGroup;
  onSubmit() {
    console.log('Form Submitted', this.loginForm.value);
    // Here you would typically handle the form submission,
    // such as sending the data to a server or updating a service.
    this.SimpleService.currentUserInfoSignal.set(this.loginForm.value);
    this.route.navigate(['/login-info']);
  }
}
