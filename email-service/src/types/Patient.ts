export interface Patient {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  photoUrl: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
