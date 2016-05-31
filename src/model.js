class Model {
    constructor(db) {
        this.db = db;
        this.table = null;
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

}

export default Model;
