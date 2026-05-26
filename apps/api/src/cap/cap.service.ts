import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCapApplicationDto } from './dto/create-cap-application.dto';
import { UpdateCapStatusDto } from './dto/update-cap-status.dto';

@Injectable()
export class CapService {
  constructor(private prisma: PrismaService) {}

  apply(createCapApplicationDto: CreateCapApplicationDto) {
    return this.prisma.cAPApplication.create({
      data: createCapApplicationDto,
    });
  }

  getStatus(userId: string) {
    return this.prisma.cAPApplication.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });
  }

  getAllApplications() {
    return this.prisma.cAPApplication.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  updateStatus(id: string, updateCapStatusDto: UpdateCapStatusDto) {
    return this.prisma.cAPApplication.update({
      where: { id },
      data: {
        status: updateCapStatusDto.status,
      },
    });
  }
}