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
        include: { makwenat: true },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        orderBy: { proID: 'desc' },
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

  //get project by id
  async getProjectById(projectID: number) {
    const project = await this.prisma.project_tab.findUnique({
      where: {
        proID: projectID,
      },
      include:{
        makwenat:true
      }
    });
    return {
      project:project};
  }
}
