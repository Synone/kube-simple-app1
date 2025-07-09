import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  /**
   * Convert File to Base64 string
   */
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Remove the data URL prefix (data:image/jpeg;base64,)
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Convert Base64 string to File
   */
  base64ToFile(base64String: string, filename: string, mimeType: string): File {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return new File([blob], filename, { type: mimeType });
  }

  /**
   * Convert Base64 string to Blob
   */
  base64ToBlob(base64String: string, mimeType: string): Blob {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  /**
   * Get data URL from Base64 string for displaying in img tag
   */
  getDataUrl(base64String: string, mimeType: string): string {
    return `data:${mimeType};base64,${base64String}`;
  }

  /**
   * Resize image before converting to Base64
   */
  resizeImageToBase64(file: File, maxWidth: number, maxHeight: number, quality: number = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx!.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL(file.type, quality);
        const base64String = dataUrl.split(',')[1];
        resolve(base64String);
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Save image to database via API
   */
  saveImageToDatabase(imageData: any): Observable<any> {
    return this.http.post('/api/images', imageData);
  }

  /**
   * Get image from database via API
   */
  getImageFromDatabase(imageId: string): Observable<any> {
    return this.http.get(`/api/images/${imageId}`);
  }

  /**
   * Validate file type
   */
  isValidImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type);
  }

  /**
   * Validate file size (in MB)
   */
  isValidFileSize(file: File, maxSizeMB: number): boolean {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  }
}
