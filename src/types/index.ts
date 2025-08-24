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

export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface IOrder extends IOrderForm {
    items: string[];
    total: number;
}

export interface IOrderAnswer {
    id: string;
    total: number;
}

export type TPaymentForm = Pick<IOrder, 'payment' | 'address'>;
export type TContactsForm = Pick<IOrder, 'email' | 'phone'>;
export type TForm = TPaymentForm & TContactsForm;
export type FormErrors = Partial<Record<keyof TForm, string>>;
export type ProductCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';