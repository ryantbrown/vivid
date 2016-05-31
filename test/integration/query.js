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

    });

};
