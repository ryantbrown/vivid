#!/usr/bin/env node
/* eslint no-console:0 */

// TODO: create cli with commands:
// TODO: init: setup connection and base model in models folder
// TODO: make:model User --migration --fields="name:string, email:string"
// Code: https://github.com/tgriesser/knex/blob/master/src/bin/cli.js

import path from 'path';
import chalk from 'chalk';
import tildify from 'tildify';
import Liftoff from 'liftoff';
import Promise from 'bluebird';
import commander from 'commander';
import interpret from 'interpret';

// const pkg = require('../../package.json');
// const fs = Promise.promisifyAll(require('fs'));
// const argv = require('minimist')(process.argv.slice(2));

function exit(msg) {
    if (msg instanceof Error) {
        chalk.red(console.error(msg.stack));
    } else {
        chalk.red(console.error(msg));
    }
    process.exit(1);
}

function success(msg) {
    console.log(msg);
    process.exit(0);
}

