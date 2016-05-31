'use strict';

import chai from 'chai';
import User from '../models/User';
import Phone from '../models/Phone';

const assert = chai.assert;
const user = new User;
const phone = new Phone;

module.exports = function() {

    describe("Base model", function(){

        it('should return correct table for the model', function(){
            assert.equal('users', user.table);
            assert.equal('phones', phone.table);
        });

        it('should return "id" by default for primary_key', function(){
            assert.equal('id', user.primary_key);
            assert.equal('id', phone.primary_key);
        });

    });

};
