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

