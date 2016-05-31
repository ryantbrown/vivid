exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('users').insert({
            name: 'Ryan 1',
            email: 'ryan1@email.com',
            password: 'password'
        }),
        knex('users').insert({
            name: 'Ryan 2',
            email: 'ryan2@email.com',
            password: 'password'
        })
    ).then(() => {
        return Promise.join(
            knex('phones').insert({
                name: 'iPhone 6',
                user_id: 1,
            }),
            knex('phones').insert({
                name: 'iPhone 5S',
                user_id: 1,
            }),
            knex('phones').insert({
                name: 'iPhone 4',
                user_id: 2,
            }),
            knex('phones').insert({
                name: 'iPhone 5C',
                user_id: 2,
            })
        );
    });
};
