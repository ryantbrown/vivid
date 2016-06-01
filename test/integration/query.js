'use strict';

import chai from 'chai';
import User from '../models/User';
import Phone from '../models/Phone';

const assert = chai.assert;
const expect = chai.expect;
const user = new User;
const phone = new Phone;

module.exports = function() {

    describe("query methods", function() {

        describe('#all()', function(){
            it('should return an array of model objects', function() {
                return user.all().get().then(users => {
                    assert.equal(2, users.length)
                    assert.equal('Ryan 1', users[0].name);
                    assert.equal('Ryan 2', users[1].name);
                });
            });
        });

        describe('#find()', function(){
            it('should return one model based on the id', function() {
                return user.find(1).get().then(user => {
                    assert.equal(1, user.id);
                    assert.equal('Ryan 1', user.name);
                });
            });
        });

        describe('#where()', function(){
            it('should filter based on key, value', function() {
                return user.where('name', 'Ryan 1').get().then(users => {
                    assert.equal('Ryan 1', users[0].name);
                });
            });
            it('should filter based on object', function(){
                return user.where({name: 'Ryan 1'}).get().then(users => {
                    assert.equal('Ryan 1', users[0].name);
                });
            });
            it('should filter based on key, operator, value', function() {
                return user.where('name', '=', 'Ryan 1').get().then(users => {
                    assert.equal('Ryan 1', users[0].name);
                });
            });

        });

        describe('#orWhere()', function() {

            const where = user.where('id', 1);

            it('should return multiple objects', function(){
                return where.orWhere('id', 2).get().then(users => {
                    assert.equal(2, users.length);
                });
            });
            it('should filter based on key, value', function() {
                return where.orWhere('id', 2).get().then(users => {
                    assert.equal(2, users[1].id);
                });
            });
            it('should filter based on object', function(){
                return where.orWhere({name: 'Ryan 2'}).get().then(users => {
                    assert.equal('Ryan 2', users[1].name);
                });
            });
            it('should filter based on key, operator, value', function() {
                return where.orWhere('name', '=', 'Ryan 2').get().then(users => {
                    assert.equal('Ryan 2', users[1].name);
                });
            });
        });

        describe('#andWhere()', function() {

        });

    });

};
