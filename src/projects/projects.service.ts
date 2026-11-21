import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.servicse.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  //pagination example
  async getAllProjectsForPagination(
    page: number,
    limit: number,
    search?: string,
  ) {
    const currentPage = page;
    const pageSize = limit;

    const where = search
      ? {
          proname: {
            contains: search,
            // mode: 'insensitive' as const,
          },
        }
      : {};

    const [projects, totalProjects] = await Promise.all([
      this.prisma.project_tab.findMany({
        where,
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        orderBy: { proID: 'desc' },
        select: {
          proID: true,
          proname: true,
        },
      }),

      this.prisma.project_tab.count({ where }),
    ]);

    return {
      projects,
      totalProjects,
      totalPages: Math.ceil(totalProjects / pageSize),
      currentPage,
      limit: pageSize,
    };
  }
}
