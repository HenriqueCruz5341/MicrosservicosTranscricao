import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTranscriptionDto {
  @IsNotEmpty()
  @IsUUID()
  _id: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
