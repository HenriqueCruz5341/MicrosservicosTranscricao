import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateTaTranscriptionDto {
  @IsNotEmpty()
  @IsUUID()
  _id: string;

  @IsNotEmpty()
  @IsString()
  ta: string;
}
