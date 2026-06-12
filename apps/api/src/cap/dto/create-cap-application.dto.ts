export class CreateCapApplicationDto {
  userId!: string;
  fullName!: string;
  college!: string;
  graduationYear!: number;
  city!: string;
  socialLinks?: string;
  whyJoin!: string;
  communityExperience?: string;
}
