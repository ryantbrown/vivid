module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: 15432,
      user: 'root',
      password: 'vagrant',
      database: 'vagrant'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'test/database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: 'test/database/seeds'
    }
  }
};
