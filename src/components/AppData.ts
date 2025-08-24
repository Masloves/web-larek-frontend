import { FormErrors, TContactsForm, TPaymentForm } from '../types/index';
import { IOrder, IProduct } from '../types/index';
import { Model } from './base/Model';
import { settings } from '../utils/constants';

interface IProductsData {
	catalog: IProduct[];
	preview: string | null;
	order: IOrder;
	formErrors: FormErrors;
	setProducts(items: IProduct[]): void;
	getProduct(id: string): IProduct;
	addToBasket(id: string): void;
	deleteFromBasket(id: string): void;
	inBasket(id: string): boolean;
	getBasketProductsCount(): number;
	getTotal(): number;
	clearBasket(): void;
	setOrderField(field: keyof TPaymentForm, value: string): void;
	validateOrder(): void;
	setContactsField(field: keyof TContactsForm, value: string): void;
	validateContacts(): void;
	setPreview(item: IProduct): void;
}

export class ProductsData extends Model<IProductsData> {
	catalog: IProduct[];
	preview: string | null;
	order: IOrder = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		items: [],
		total: 0,
	};
	formErrors: FormErrors = {};

	setProducts(items: IProduct[]): void {
		this.catalog = items;
		this.events.emit('products:changed');
	}

	getProduct(id: string): IProduct {
		return this.catalog.find((item) => item.id === id);
	}

	addToBasket(id: string): void {
		this.order.items.push(id);
		this.order.total = this.getTotal();
		this.events.emit('products:changed');
	}

	deleteFromBasket(id: string): void {
		this.order.items = this.order.items.filter((item) => item !== id);
		this.order.total = this.getTotal();
		this.events.emit('products:changed');
	}

	inBasket(id: string): boolean {
		return this.order.items.find((item) => item === id) ? true : false;
	}

	getBasketProductsCount(): number {
		return this.order.items.length;
	}

	getTotal(): number {
		return this.order.items.reduce((total, itemId) => {
			const product = this.catalog.find((p) => p.id === itemId);
			return total + (product?.price ?? 0);
		}, 0);
	}

	clearBasket(): void {
		this.order = {
			payment: '',
			email: '',
			phone: '',
			address: '',
			items: [],
			total: 0,
		};
		this.events.emit('products:changed');
	}

	setOrderField(field: keyof TPaymentForm, value: string): void {
		this.order[field] = value;
		this.validateOrder();
	}

	validateOrder(): void {
		const errors: typeof this.formErrors = {};
		if (!this.order.payment) {
			errors.payment = settings.formErrors.payment;
		}
		if (!this.order.address) {
			errors.address = settings.formErrors.address;
		}
		this.formErrors = errors;
		this.events.emit('orderFormErrors:change', this.formErrors);
	}

	setContactsField(field: keyof TContactsForm, value: string): void {
		this.order[field] = value;
		this.validateContacts();
	}

	validateContacts(): void {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = settings.formErrors.email;
		}
		if (!this.order.phone) {
			errors.phone = settings.formErrors.phone;
		}
		this.formErrors = errors;
		this.events.emit('contactsFormErrors:change', this.formErrors);
	}

	setPreview(item: IProduct): void {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}
}
