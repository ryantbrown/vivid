const config = {
    client: 'pg',
        connection: {
        host: '127.0.0.1',
        port: 15432,
        user: 'root',
        password: 'vagrant',
        database: 'vagrant',
        charset: 'utf8'
    }
};

module.exports = require('knex')(config);
