import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    // const updateCommand = {
    //   update: 'campaigns',
    //   updates: [
    //     {
    //       q: {},
    //       u: [
    //         {
    //           $set: {
    //             campaignStartAt: { $toInt: '$campaignStartAt' },
    //             campaignEndAt: { $toInt: '$campaignEndAt' },
    //             eventDayTime: { $toInt: '$eventDayTime' },
    //           },
    //         },
    //       ],
    //       multi: true,
    //     },
    //   ],
    // };

    // await this.$runCommandRaw(updateCommand);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
