import { Component, computed, effect, signal, SimpleChange } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SimpleService } from "../../services/simple.service";
import { ImageService } from "../../services/image-service";
import { Image } from "../../models/image";
import { DogInfo } from "../../models/dog";
@Component({
  selector: 'app-login-info',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './login-info.component.html',
  styleUrl: './login-info.component.css'
})
export class LoginInfoComponent {
  constructor(private simpleService: SimpleService, private imageService: ImageService) {
    this.simpleService.getDogInfo();
    effect(() => {
      console.log('Dog info changed:', this.dogInfo());
    });
  }
  dogInfo = computed(() => this.simpleService.dogSignal());
  getImageUrl(image: Image): string {
    return this.imageService.getDataUrl(image.data, image.fileType);
  }

  getImg(index: number) {
    return `data:image/jpeg;base64, ${this.dogInfo()?.[index]?.image_data}`;
  }

  deleteDog(dogId: string) {
    this.simpleService.deleteDogInfo(dogId);
  }
}
