import { ApiProperty } from '@nestjs/swagger';

export class DateDto {
	@ApiProperty()
	readonly date: Date;
}
