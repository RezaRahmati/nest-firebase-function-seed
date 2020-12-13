import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Together we will beat COVID-19';
	}
}
