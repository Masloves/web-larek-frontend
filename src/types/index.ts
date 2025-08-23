export interface IProduct {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
}

export interface IProductsCatalog {
    items: IProduct[];
}

export interface IContacts {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrder extends IContacts {
    items: string[];
    total: number;
}

export interface IBasket {
    items: HTMLElement[];
    total: number;
}

export interface IPage {
    products: HTMLElement[];
    counter: number;
}

export interface ICard {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number;
    index: number;
    changeButton(price: number, inBasket: boolean): void;
}

export interface IOrderAnswer {
    id: string;
    total: number;
}

export type TPaymentForm = Pick<IOrder, 'payment' | 'address'>;
export type TContactsForm = Pick<IOrder, 'email' | 'phone'>;
export type TForm = TPaymentForm & TContactsForm;
export type FormErrors = Partial<Record<keyof TForm, string>>;
export type TSuccess = Pick<IBasket, 'total'>;

export interface IWebLarekState {
	catalog: IProduct[];
	preview: string | null;
	order: IOrder;
	formErrors: FormErrors;
	setProducts(items: IProduct[]): void;
	addToBasket(id: string): void;
	deleteFromBasket(id: string): void;
	inBasket(id: string): boolean;
	getBasketProductsCount(): number;
	getTotal(): number;
	clearBasket(): void;
	setOrderField(field: keyof TPaymentForm, value: string): void;
	setContactsField(field: keyof TContactsForm, value: string): void;
	validateOrder(): void;
	validateContacts(): void;
	setPreview(item: IProduct): void;
}

export interface ISuccess {
	total: number;
}

export interface IModalData {
	content: HTMLElement;
}