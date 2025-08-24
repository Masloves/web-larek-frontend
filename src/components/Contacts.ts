import { Form } from "./common/Form";
import { IEvents } from "./base/events";
import { TContactsForm } from '../types';

export class Contacts extends Form<Partial<TContactsForm>> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

    set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
	}
}