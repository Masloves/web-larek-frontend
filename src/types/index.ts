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
    adress: string;
    email: string;
    phone: string;
}

export interface IBasket {
    items: string[];
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

export interface IProductCatalog {
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