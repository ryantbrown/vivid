'use strict';

import chai from 'chai';
import User from '../models/User';
import Phone from '../models/Phone';

const assert = chai.assert;
const user = new User;
const phone = new Phone;

module.exports = function() {

    describe("query methods", function(){

        describe('#find()', function(){
            it('should return one model based on the id', function(){
                return user.find(1).get().then(function(user){
                    assert.equal(1, user.id);
                    assert.equal('Ryan 1', user.name);
                });
            });
        });

        describe('#all()', function(){
            it('should return an array of model objects', function(){
                return user.all().get().then(function(users){
                    assert.equal(2, users.length)
                    assert.equal('Ryan 1', users[0].name);
                    assert.equal('Ryan 2', users[1].name);
                });
            });
        });

    });

};
