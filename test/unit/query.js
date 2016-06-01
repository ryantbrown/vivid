'use strict';

import chai from 'chai';
import sinon from 'sinon';
import User from '../models/User';
import Phone from '../models/Phone';
import { QueryBuilderError } from '../../lib/vivid';

const assert = chai.assert;
const expect = chai.expect;

module.exports = function() {

    let user;

    beforeEach(function(done){
        user = new User;
        done();
    });

    describe("Base model queries", function(){

        describe('#get()', function() {
            it('should return the current query', function() {
                user.query = 'the current query';
                assert.equal(user.get(), 'the current query');
            });
        });

        describe('#all()', function() {
            it('should return correct sql statement', function() {
                const json = user.all().get().toSQL();
                assert.equal(json.sql, 'select * from "users"');
            });
        });

        describe('#find()', function() {
            it('should return correct sql statement and bindings', function() {
                const json = user.find(1).get().toSQL();
                assert.equal(json.sql, 'select * from "users" where "id" = ? limit ?');
                assert.deepEqual(json.bindings, ['1', '1']);
            });
        });

        describe('#where()', function() {
            it('should return correct sql statement and bindings', function() {
                const json = user.where('name', 'Ryan 1').get().toSQL();
                assert.equal(json.sql, 'select * from "users" where "name" = ?');
                assert.deepEqual(json.bindings, ['Ryan 1']);
            });
            it('should throw a QueryBuilderError if more than 3 params are passed', function(){
                expect(user.where.bind(user, 1,2,3,4)).to.throw(QueryBuilderError);
            });
        });

        describe('#orWhere()', function() {
            it('should return correct sql statement and bindings', function() {
                const json = user.where('name', 'Ryan 2').orWhere('name', 'Ryan 1').get().toSQL();
                assert.equal(json.sql, 'select * from "users" where "name" = ? or "name" = ?');
                assert.equal(json.bindings.length, 2);
            });
            it('should throw a QueryBuilderError if more than 3 params are passed', function(){
                expect(user.orWhere.bind(user, 1,2,3,4)).to.throw(QueryBuilderError);
            });
            /*
            it('should throw a QueryBuilderError if not preceeded by a where clause', function(){
                expect(user.orWhere.bind(user, 1,2,3)).to.throw(QueryBuilderError);
            });
            */
        });

        describe('#whereIn()', function() {
            it('should throw a TypeError if the first parameter is not a string', function(){
                expect(user.whereIn.bind(user, 0, [1,2])).to.throw(TypeError);
            });
            it('should throw a TypeError if the second parameter is not an array', function(){
                expect(user.whereIn.bind(user, 'id', 0)).to.throw(TypeError);
            });
        });

    });

};
