
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', table => {
            table.increments('id').primary();
            table.string('name');
            table.string('email');
            table.string('password', 60);
            table.timestamps(true, true); // type=timestamp, not null and default now()
        }),
        knex.schema.createTable('phones', table => {
            table.increments('phone_id').primary();
            table.string('name');
            table.integer('user_id').unsigned().references('users.id');
            table.index('user_id');
            table.timestamps(true, true);
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('phones'),
        knex.schema.dropTable('users')
    ]);
};
