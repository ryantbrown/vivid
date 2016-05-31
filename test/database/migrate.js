const exec = require('child_process').exec;

function rollback(done) {
    exec('knex migrate:rollback', err => {
        if (err) return done(err);
        done();
    });
};

function migrate(done) {
    exec('knex migrate:latest', err => {
        if (err) return done(err);
        done();
    });
};

function seed(done) {
    exec('knex seed:run', err => {
        if (err) return done(err);
        done();
    });
};

function migrateAndSeed(done) {
    exec('knex migrate:latest', err => {
        if (err) return done(err);
        exec('knex seed:run', err => {
            if (err) return done(err);
            done();
        })
    });
}

module.exports = {
    seed: seed,
    run: migrate,
    rollback: rollback,
    runAndSeed: migrateAndSeed,
};
