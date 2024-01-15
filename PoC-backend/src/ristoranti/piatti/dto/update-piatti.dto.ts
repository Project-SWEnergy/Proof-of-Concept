import { PartialType } from '@nestjs/mapped-types';
import { CreatePiattiDto } from './create-piatti.dto';

export class UpdatePiattiDto extends PartialType(CreatePiattiDto) {}
