import { Form } from "./common/Form";
import { IEvents } from "./base/events";
import { TPaymentForm } from '../types';


export class Order extends Form<Partial<TPaymentForm>> {
	protected _buttonOnline: HTMLButtonElement;
	protected _buttonCash: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._buttonOnline = this.container.elements.namedItem('card') as HTMLButtonElement;
		this._buttonCash = this.container.elements.namedItem('cash') as HTMLButtonElement;

		this._buttonOnline.addEventListener('click', () => {
			this._buttonOnline.classList.add('button_alt-active');
			this._buttonCash.classList.remove('button_alt-active');
			this.onFieldChange('payment', this._buttonOnline.name);
		});

		this._buttonCash.addEventListener('click', () => {
			this._buttonOnline.classList.remove('button_alt-active');
			this._buttonCash.classList.add('button_alt-active');
			this.onFieldChange('payment', this._buttonCash.name);
		});
	}

	set payment(value: string) {
		if (value) {
			this.toggleClass(
				this.container.elements.namedItem(value) as HTMLButtonElement,
				'button_alt-active',
				true
			);
		} else {
			this._buttonOnline.classList.remove('button_alt-active');
			this._buttonCash.classList.remove('button_alt-active');
		}
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value;
	}
}
