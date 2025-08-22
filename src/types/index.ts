export interface IProduct {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
    price: number | null;
}

export interface IContacts {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IBasket {
    items: HTMLElement[];
    total: number;
}

export interface IOrder extends IContacts {
    items: string[];
    total: number;
}

export interface IPage {
    products: HTMLElement[];
    counter: number;
}

export interface IProductsCatalog {
    items: IProduct[];
}

export interface ICard {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number;
    index: number;
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