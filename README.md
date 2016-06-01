# Vivid

Vivid is an Active Record based ORM for Node, supporting PostgresSQL, MySQL, MariaDB, Sqlite3 and Oracle. Under the hood it uses [Knex](http://knexjs.org/), a well-tested query and schema builder for relational databases. Vivid makes it easy to map models to tables in your database and supports numerous relationship types. It also exposes a Collection class for easy result manipulation and comes with a CLI for initializing the library and generating models with corresponding migrations.

## Install

Vivid depends on [Knex](http://knexjs.org/) so you'll need to install both as well as the adapter for your database.

```js
# install knex and vivid
npm install knex vivid --save

# install an adapter
npm install pg
npm install mysql
npm install mariasql
npm install sqlite3
```

## Setup

There are a few things to setup before you can begin using Vivid. The following steps can be automated by running `$ vivid init`.

### Knexfile.js

In order to create migrations and setup your database connections you should create a knexfile.js in the root of your project. You should also create directories for your migration and seed files. An example knexfile.js can bee seen below, please see the [Knex documentation](http://knexjs.org/#knexfile) for more information.

```js
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'root',
      password: 'password',
      database: 'database',
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'database/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }
  }
};
```

### Connection

We need to store our database connection (Knex instance) in a module so we can require it whenever we need. We can use the newly created knexfile.js as the config for our connection.

```js
# grab the development object from the knexfile
const config = require('../knexfile').development;

module.exports = require('knex')(config);
```

Now when you need access to the connection you do the following

```js
const db = require('./database/connection');
```

### Base Model

Vivid exposes a base model that accepts the connection via the constructor.

```js
import { Model } from 'vivid';

const db = require('./database/connection');

class User extends Model {
    constructor() {
        super(db)
        this.table = 'users';
    }
}
```

It is recommended that you create a base model for your application that extends the Vivid base model. This is a popular pattern and allows you to add methods that will be shared among all your models. In `models/Base.js`:

```js
const db = require('../database/connection');

import { Model } from '../../lib/vivid';

class Base extends Model {
    constructor() {
        super(db);
    }
}

export default Base;
```

Now when creating your models you can extend this `Base.js` class. In `models/User.js`:

```js
import Base from './Base';

class User extends Base {
    constructor() {
        super();
        this.table = 'users'
    }
}

export default User;
```

## Usage

In `models/User.js`:

```js
import Base from './Base';
import Phone from './Phone';

class User extends Base {
    constructor() {
        super();
        this.table = 'users'
    }

    phone() {
        return this.hasOne(Phone, 'user_id');
    }
}
```

In `models/Phone.js`:

```js
import Base from './Base';
import User from './User';

class Phone extends Base {
    constructor() {
        super();
        this.table = 'phones'
    }

    user() {
        return this.belongsTo(User, 'user_id');
    }
}
```

Using these models:

```js
import User from '../models/User';
import Phone from '../models/Phone';

let user = new User;
let phone = new Phone;

// find user by ID
user.find(1).get().then(user => {
    // access the user object
    console.log(user);
});

// get phone through user relationship
user.find(1).with('phone').get().then(user => {
    // access to phone object via user.phone
    console.log(user.phone);
});

// get user through phone relationship
phone.find(1).user().then(user => {
    // access to user
    console.log('user');
})

// create new user
const new_user = {
    name: 'Ryan',
    email: 'me@ryantbrown.io'
};

user.create(new_user).then(user => {
    // access the new user object
    console.log(user);
})
```





