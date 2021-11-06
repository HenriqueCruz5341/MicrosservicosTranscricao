import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';

@Injectable()
export class UuidService {
  generate(): string {
    return uuid();
  }
}
