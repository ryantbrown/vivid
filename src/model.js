import { QueryBuilderError } from './errors';

class Model {
    constructor(db) {

        if (this.constructor === Model) {
            throw new TypeError('"Model" cannot be instantiated directly');
        }

        this.db = db;
        this.query = null;
        this.timestamps = true;
        this.primary_key = 'id';
        this.hidden = [];
        this.fillable = [];
        this.guarded = ['*'];
    }

    get() {
        return this.query;
    }

    all() {
        this.query = this.db(this.table);
        return this;
    }

    find(id) {
        this.query = this.db(this.table).where(this.primary_key, id).first();
        return this;
    }

    where(...params) {
        if (params.length > 3) {
            throw new QueryBuilderError('the "where" method takes a maximum of 3 parameters');
        }

        const table = this.db(this.table);

        this.query = table.where.apply(table, params);
        return this;
    }

    orWhere(...params) {
        if (params.length > 3) {
            throw new QueryBuilderError('the "orWhere" method takes a maximum of 3 parameters');
        }

        if (!this.query.toSQL().sql.includes('where')) {
            throw new QueryBuilderError('"orWhere" must be preceeded by a where method');
        }

        this.query = this.query.orWhere.apply(this.query, params);
        return this;
    }

    andWhere(...params) {

    }

    whereIn(column, data) {
        if (typeof column !== 'string') {
            throw new TypeError('the "whereIn" method expects a string as the first parameter');
        }
        if (data.constructor !== Array) {
            throw new TypeError('the "whereIn" method expects as array as the second parameter');
        }
        this.query = this.db(this.table).whereIn(column, data);
        return this;
    }

}

export default Model;