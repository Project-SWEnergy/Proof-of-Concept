/***
 * @file main.ts
 * # Prima Versione dell'API
 * ## Descrizione
 * Questa è la prima versione dell'API, che verrà utilizzata per il progetto Easy Meal.
 * @version 0.1
 * Sono utilizzati i server di fl0 per il deploy.
 * Nella sezione "/api" è possibile trovare la documentazione dell'API.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { exec } from 'child_process';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Easy Meal')
		.setDescription('The Easy Meal API description')
		.setVersion('0.1')
		.build();

	const options: SwaggerDocumentOptions = {
		operationIdFactory: (_: string, methodKey: string) => methodKey,
	};

	// Allow only requests from localhost:8000
	const cors = require('cors');
	app.use(cors({
		origin: 'http://localhost:4200',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true, // if you need to pass cookies, set this to true
	}));

	const document = SwaggerModule.createDocument(app, config, options);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
