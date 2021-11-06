import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateNluTranscriptionDto {
  @IsNotEmpty()
  @IsUUID()
  _id: string;

  @IsNotEmpty()
  @IsString()
  nlu: string;
}
