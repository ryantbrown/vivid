import Base from './Base';

class Phone extends Base {
    constructor() {
        super();
        this.table = 'phones';
        this.primary_key = 'phone_id';
    }
}

export default Phone;
