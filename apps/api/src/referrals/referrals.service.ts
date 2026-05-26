import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenerateReferralDto } from './dto/generate-referral.dto';
import { UseReferralDto } from './dto/use-referral.dto';

@Injectable()
export class ReferralsService {
  constructor(private prisma: PrismaService) {}

  async generate(generateReferralDto: GenerateReferralDto) {
    const { userId, username } = generateReferralDto;

    const randomNumber = Math.floor(100 + Math.random() * 900);
    const referralCode = `${username.toUpperCase()}${randomNumber}`;

    return this.prisma.referral.create({
      data: {
        referralCode,
        referrerId: userId,
      },
    });
  }

  async useReferral(useReferralDto: UseReferralDto) {
    const { referralCode, referredUserId } = useReferralDto;

    const referral = await this.prisma.referral.findUnique({
      where: { referralCode },
    });

    if (!referral) {
      throw new BadRequestException('Invalid referral code');
    }

    if (referral.referrerId === referredUserId) {
      throw new BadRequestException('Cannot refer yourself');
    }

    const updatedReferral = await this.prisma.referral.update({
      where: { referralCode },
      data: {
        referredUserId,
      },
    });

    await this.prisma.xPTransaction.create({
      data: {
        userId: referral.referrerId,
        amount: 100,
        reason: 'Successful referral',
      },
    });

    return updatedReferral;
  }

  async getReferrals(userId: string) {
    const referrals = await this.prisma.referral.findMany({
      where: {
        referrerId: userId,
      },
    });

    const xp = await this.prisma.xPTransaction.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      referrals,
      totalXP: xp._sum.amount || 0,
    };
  }

  async getLeaderboard() {
    const leaderboard = await this.prisma.xPTransaction.groupBy({
      by: ['userId'],
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
    });

    return leaderboard;
  }
}