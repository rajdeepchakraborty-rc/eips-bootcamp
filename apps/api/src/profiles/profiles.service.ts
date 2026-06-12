import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  create(createProfileDto: CreateProfileDto) {
    const { userId, ...profileData } = createProfileDto;

    return this.prisma.profile.create({
      data: {
        ...profileData,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findOne(userId: string) {
    return this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });
  }

  update(userId: string, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile.update({
      where: { userId },
      data: updateProfileDto,
    });
  }
}
