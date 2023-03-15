import { UserEdit } from './views/UserEdit';
import { User } from './models/User';

const user = User.buildUser({
	name: 'Janek',
	age: 40,
});

const root = document.getElementById('root');

if (!root) {
	throw new Error('Root element not found');
}

const userEdit = new UserEdit(root, user);
userEdit.render();
console.log(userEdit);
