import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get(':userId')
  async getAssignments(@Param('userId') userId: string) {
    return this.assignmentsService.getAssignmentsForUser(userId);
  }

  @Post(':id/submit')
  async submitAssignment(
    @Param('id') assignmentId: string,
    @Body('userId') userId: string,
    @Body('content') content: string,
  ) {
    if (!userId) {
      throw new NotFoundException('User ID required');
    }
    return this.assignmentsService.submitAssignment(
      userId,
      assignmentId,
      content,
    );
  }

  @Post()
  async createAssignment(@Body() data: any) {
    return this.assignmentsService.createAssignment(data);
  }

  @Put(':id')
  async updateAssignment(@Param('id') id: string, @Body() data: any) {
    return this.assignmentsService.updateAssignment(id, data);
  }

  @Delete(':id')
  async deleteAssignment(@Param('id') id: string) {
    return this.assignmentsService.deleteAssignment(id);
  }
}
