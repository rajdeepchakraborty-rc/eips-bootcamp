export class CreateProfileDto {
  userId!: string;
  fullName?: string;
  college?: string;
  year?: number;
  city?: string;
  country?: string;
  avatarUrl?: string;
  bio?: string;
}