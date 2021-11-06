import { Controller, Get } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';

@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Get()
  findAll() {
    return this.transcriptionService.findAll();
  }
}
