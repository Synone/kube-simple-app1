
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { SimpleService } from '../services/simple.service';
import { ImageService } from '../services/image-service';
import { DogInfo } from '../models/dog';
import { v4 as uuidv4 } from 'uuid';
type DogFormGroup = FormGroup<{
  [K in keyof DogInfo]: FormControl<DogInfo[K]>
}>;
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [SimpleService]
})
export class LoginComponent {


  constructor(private fb: FormBuilder, private simpleService: SimpleService, private route: Router) {
    this.dogForm = this.fb.group({
      id: [uuidv4()],
      dog_name: ['', [Validators.required, Validators.minLength(3)]],
      breed: ['', [Validators.required, Validators.minLength(6)]],
      about: ['', [Validators.required, Validators.minLength(10)]],
      image_data: ['', [Validators.required]],
    }) as DogFormGroup


  }
  // readonly formModel = new FormGroup<Record<keyof DogInfo, AbstractControl>>({
  //   id: new FormControl(uuidv4()),
  //   dogName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   breed: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   about: new FormControl('', [Validators.required, Validators.minLength(10)]),
  //   imageData: new FormControl('', [Validators.required]),
  // }
  // )
  private imageService = inject(ImageService);
  errorMessage: string = '';
  dogForm!: FormGroup;
  selectedFile!: File;
  resizeImage: boolean = false;

  onSubmit() {
    console.log('Form Submitted', this.dogForm.value);
    this.simpleService.saveDogInfo(this.dogForm.value).subscribe({
      next: (response) => {
        console.log('User info saved successfully:', response);
        this.route.navigate(['/login-info']);
      },
      error: (error) => {
        console.error('Error saving user info:', error);
      }
    })

  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file
    if (!this.imageService.isValidImageFile(file)) {
      this.errorMessage = 'Please select a valid image file (JPEG, PNG, GIF, WebP)';
      return;
    }

    if (!this.imageService.isValidFileSize(file, 5)) { // 5MB limit
      this.errorMessage = 'File size must be less than 5MB';
      return;
    }

    this.selectedFile = file;
    const base64String = await this.imageService.fileToBase64(this.selectedFile);
    this.dogForm.patchValue({
      image_data: base64String
    });
    this.errorMessage = '';

  }
}
