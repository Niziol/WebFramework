import { Collection } from '../models/Collection';

export abstract class CollectionView<T, K> {
	constructor(public parent: Element, public collection: Collection<T, K>) {}

	abstract renderItem(itemParent: Element, model: T): void;

	render = (): void => {
		this.parent.innerHTML = '';

		const templateElement = document.createElement('template');

		for (let model of this.collection.models) {
			const itemParent = document.createElement('div');
			this.renderItem(itemParent, model);
			templateElement.content.append(itemParent);
		}

		this.parent.append(templateElement.content);
	};
}
