import { Model, HasId } from '../models/Model';

export abstract class View<M extends Model<K>, K extends HasId> {
	regions: { [key: string]: Element } = {};

	constructor(public parent: Element, public model: M) {
		this.bindModel();
	}

	abstract template(): string;

	eventsMap = (): { [key: string]: () => void } => {
		return {};
	};

	regionsMap = (): { [key: string]: string } => {
		return {};
	};

	onRender = (): void => {}

	bindModel = (): void => {
		this.model.on('change', () => {
			this.render();
		});
	};

	bindEvents = (fragment: DocumentFragment): void => {
		const eventsMap = this.eventsMap();
		for (let eventKey in eventsMap) {
			const [eventName, selector] = eventKey.split(':');
			fragment.querySelectorAll(selector).forEach((element) => {
				element.addEventListener(eventName, eventsMap[eventKey]);
			});
		}
	};

	mapRegions = (fragment: DocumentFragment): void => {
		const regionsMap = this.regionsMap();

		for (const key in regionsMap) {
			const selector = regionsMap[key];
			const element = fragment.querySelector(selector)
			if(element){
				this.regions[key] = element;
			}
		}
	};

	render = (): void => {
		this.parent.innerHTML = '';

		const templateElement = document.createElement('template');
		templateElement.innerHTML = this.template();

		this.bindEvents(templateElement.content);
		this.mapRegions(templateElement.content);

		this.onRender();

		this.parent.append(templateElement.content);
	};
}
