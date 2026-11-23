import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Search,
} from '@nestjs/common';
import { ProjectsService } from './projects.service.js';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly ProjectsServices: ProjectsService) {}

  // pagination method
  @Get('/projects-list')
  // @Roles(UserRole.ADMIN)
  // @UseGuards(AuthRolesGuard)
  getAllProjectssWithPagination(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ) {
    return this.ProjectsServices.getAllProjectsForPagination(
      page,
      limit,
      search,
    );
  }

  //get project by id
  @Get("project/:id")
  getProjectByID(@Param("id",ParseIntPipe)id:number){
    return this.ProjectsServices.getProjectById(id)

  }
}
