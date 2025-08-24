import { Component } from "./base/Component";
import { ProductCategory } from "../types";
import { formatNumber } from "../utils/utils";
import { settings } from '../utils/constants';

interface ICard {
    id: string;
    category?: string;
    title: string;
    description?: string;
    image?: string;
    price: number;
    index: number;
    changeButton(price: number, inBasket: boolean): void;
}

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
    protected _title: HTMLElement;
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _category?: HTMLElement;
    protected _price: HTMLElement;
    protected _index?: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = container.querySelector(`.card__title`);
		this._image = container.querySelector(`.card__image`);
        this._description = container.querySelector(`.card__text`);
        this._button = container.querySelector(`.card__button`);
        this._category = container.querySelector(`.card__category`);
		this._price = container.querySelector(`.card__price`);
		this._index = container.querySelector(`.basket__item-index`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string) {
       this.setText(this._description, value);   
    }

    set category(value: ProductCategory) {
		this.setText(this._category, value);
		this.toggleClass(this._category, settings.categories[value]);
	}

    set price(value: number) {
		let priceText = '';
		if (!value) {
			priceText = settings.card.priceless;
			this.setDisabled(this._button, true);
		} else {
			priceText = formatNumber(value) + ' ' + settings.currency;
		}
		this.setText(this._price, priceText);
	}

    set index(value: number) {
		this.setText(this._index, String(value));
	}

    changeButton(price: number, inBasket: boolean): void {
		if (!price) {
			this.setText(this._button, settings.cardButtonValues.disabled);
			this.setDisabled(this._button, true);
		} else {
			if (inBasket) {
				this.setText(this._button, settings.cardButtonValues.delete);
			} else {
				this.setText(this._button, settings.cardButtonValues.add);
			}
		}
	}
}