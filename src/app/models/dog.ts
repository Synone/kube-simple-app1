export interface DogInfo  {
  id: string;
  dog_name: string;
  breed: string;
  about: string;
  image_data: string; // Base64 encoded image string
  created_at?: Date; // Optional field for creation date
}
