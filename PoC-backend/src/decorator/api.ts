import { Controller as NestController } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function Api(path: string): ClassDecorator {
	return function(target: any) {
		ApiTags(path)(target); // Apply @ApiTags('path')
		NestController(path)(target); // Apply @Controller('path')
	};
}
