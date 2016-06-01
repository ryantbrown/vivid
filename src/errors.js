class BaseError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.stack = (new Error(message)).stack;
        this.name = this.constructor.name;
    }
}

class RelationError extends BaseError {
    constructor(message) {
        super(message);
    }
}

class QueryBuilderError extends BaseError {
    constructor(message) {
        super(message);
    }
}

export {
    RelationError,
    QueryBuilderError
};
