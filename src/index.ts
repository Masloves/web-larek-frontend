import './scss/styles.scss';

import { WebLarekAPI } from "./components/WebLarekAPI";
import { API_URL, CDN_URL } from "./utils/constants";
import { EventEmitter } from "./components/base/events";
import { ProductsData } from "./components/AppData";
import { Page } from "./components/Page";
import { Card } from "./components/Card";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Modal } from "./components/common/Modal";
import { Basket } from "./components/common/Basket";
import { Contacts } from "./components/Contacts";
import { IProduct, IProductsCatalog, ProductCategory, TContactsForm, TPaymentForm } from "./types";
import { Order } from "./components/Order";
import { Success } from "./components/common/Success";

const events = new EventEmitter();

const api = new WebLarekAPI(CDN_URL, API_URL);

events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

const appData = new ProductsData({}, events);

const productCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const productPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const productBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const paymentFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const order = new Order(cloneTemplate(paymentFormTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsFormTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

events.on<IProductsCatalog>('products:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(productCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category as ProductCategory,
		});
	});

	page.counter = appData.getBasketProductsCount();
});

events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

events.on('preview:changed', (item: IProduct) => {
	const card = new Card(cloneTemplate(productPreviewTemplate), {
		onClick: () => {
			events.emit('basket:changed', item);
			modal.close();
		},
	});
	card.changeButton(item.price, appData.inBasket(item.id));
	modal.render({
		content: card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category as ProductCategory,
		}),
	});
});

events.on('basket:open', () => {
	basket.items = appData.order.items.map((id, index) => {
		const item = appData.getProduct(id);
		const card = new Card(cloneTemplate(productBasketTemplate), {
			onClick: () => events.emit('basket:delete', item),
		});
		return card.render({
			id: item.id,
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	basket.total = appData.getTotal();

	modal.render({
		content: basket.render({}),
	});
});

events.on('basket:changed', (item: IProduct) => {
	if (appData.inBasket(item.id)) {
		appData.deleteFromBasket(item.id);
	} else {
		appData.addToBasket(item.id);
	}
});

events.on('basket:delete', (item: IProduct) => {
	appData.deleteFromBasket(item.id);
	events.emit('basket:open');
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			payment: appData.order.payment,
			address: appData.order.address,
			valid: !!appData.order.payment && !!appData.order.address,
			errors: [],
		}),
	});
});

events.on(/^order\..*:change/, (data: { field: keyof TPaymentForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on('orderFormErrors:change', (errors: Partial<TPaymentForm>) => {
	order.valid = Object.keys(errors).length > 0 ? false : true;
	order.errors = Object.values(errors)
		.filter((i) => !!i)
		.join('; ');
});

events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			phone: appData.order.phone,
			email: appData.order.email,
			valid: !!appData.order.phone && !!appData.order.email,
			errors: [],
		}),
	});
});

events.on(/^contacts\..*:change/, (data: { field: keyof TContactsForm; value: string }) => {
		appData.setContactsField(data.field, data.value);
	}
);

events.on('contactsFormErrors:change', (errors: Partial<TContactsForm>) => {
	contacts.valid = Object.keys(errors).length > 0 ? false : true;
	contacts.errors = Object.values(errors)
		.filter((i) => !!i)
		.join('; ');
});

events.on('contacts:submit', () => {
	api
		.sendOrder(appData.order)
		.then((result) => {
			appData.clearBasket();
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});

			modal.render({
				content: success.render({ total: result.total }),
			});
		})
		.catch((err) => console.log(err));
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

api.getProducts()
	.then((data) => {
		appData.setProducts(data);
		console.log(1)
	})
	.catch((err) => console.log(err));
