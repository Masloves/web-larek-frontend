import { IOrder, IProduct, IProductsCatalog, IOrderAnswer } from '../types/index';
import { Api } from './base/api';


interface IWebLarekAPI {
	getProducts: () => Promise<IProduct[]>;
	sendOrder: (data: Partial<IOrder>) => Promise<IOrderAnswer>;
}

export class WebLarekAPI extends Api implements IWebLarekAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IProduct[]> {
		return this.get('/product').then((data: IProductsCatalog) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	sendOrder(data: Partial<IOrder>): Promise<IOrderAnswer> {
		return this.post('/order', data).then((data: IOrderAnswer) => data);
	}
}