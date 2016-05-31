import Base from './Base';

class User extends Base {
    constructor() {
        super();
        this.table = 'users';
    }
}

export default User;
