import 'dotenv/config';

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaMssql({
      server: process.env.DB_HOST!,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,

      options: {
        encrypt: false,
        trustServerCertificate: true,
      },

      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
    });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to SQL Server successfully!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
