const db = require('../database/connection');
import { Model } from '../../lib/vivid';

class Base extends Model {
    constructor() {
        super(db);
    }
}

export default Base;
