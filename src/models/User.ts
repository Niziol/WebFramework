import { Model } from './Model';
import { Attributes } from './Attributes';
import { ApiSync } from './ApiSync';
import { Eventing } from './Eventing';
import { Collection } from './Collection';

export interface UserProps {
	id?: number;
	name?: string;
	age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
	static buildUser = (attrs: UserProps): User => {
		return new User(
			new Attributes<UserProps>(attrs),
			new Eventing(),
			new ApiSync<UserProps>(rootUrl)
		);
	};

	static buildUserCollection = (): Collection<User, UserProps> => {
		return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
			User.buildUser(json)
		);
	};

	isAdminUser = (): boolean => {
		return this.get('id') === 1;
	};

	isAdult = (): boolean => {
		const age = this.get('age');
		if (typeof age !== 'number') {
			throw new Error('User dont have an age');
		}

		return age >= 18;
	};

	setRandomAge = (): void => {
		const age = Math.round(Math.random() * 100);
		this.set({ age });
	};

	setName = (name: string): void => {
		// const
	};
}