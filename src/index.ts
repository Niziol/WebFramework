import { Collection } from './models/Collection';
import { UserList } from './views/UserList';
import { User, UserProps } from './models/User';

const users = new Collection(
	'http://localhost:3000/users',
	(json: UserProps) => {
		return User.buildUser(json);
	}
);

users.on('change', () => {
	const root = document.getElementById('root');

	if (root) {
		new UserList(root, users).render();
	}
});

users.fetch();

// import { UserEdit } from './views/UserEdit';
// import { User } from './models/User';

// const user = User.buildUser({
// 	name: 'Janek',
// 	age: 40,
// });

// const root = document.getElementById('root');

// if (!root) {
// 	throw new Error('Root element not found');
// }

// const userEdit = new UserEdit(root, user);
// userEdit.render();
// console.log(userEdit);
