import {NestFactory} from '@nestjs/core';
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';

import {AppModule} from './app.module';

const server: express.Express = express();

export const createNestServer = async (expressInstance: express.Express): Promise<NestExpressApplication> => {
	const adapter: ExpressAdapter = new ExpressAdapter(expressInstance);
	const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(
		AppModule, adapter, {},
	);

	app.enableCors();

	return app.init();
};

createNestServer(server)
	.then(v => console.log('Nest Ready'))
	.catch(err => console.error('Nest broken', err));

export const api: functions.HttpsFunction = functions.https.onRequest(server);
