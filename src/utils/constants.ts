export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
	categories: {
		'софт-скил': 'card__category_soft',
		другое: 'card__category_other',
		дополнительное: 'card__category_additional',
		кнопка: 'card__category_button',
		'хард-скил': 'card__category_hard',
	},

	card: {
		priceless: 'Бесценно',
	},

	cardButtonValues: {
		add: 'Купить',
		delete: 'Удалить из корзины',
		disabled: 'Недоступно',
	},

    currency: 'синапсов',

	basket: {
		null: 'Корзина пуста',
	},

	formErrors: {
		payment: 'Необходимо выбрать способ оплаты',
		address: 'Необходимо указать адрес',
		email: 'Необходимо указать email',
		phone: 'Необходимо указать телефон',
	},
};
