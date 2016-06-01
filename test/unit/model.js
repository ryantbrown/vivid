'use strict';

import chai from 'chai';
import User from '../models/User';
import Phone from '../models/Phone';

const assert = chai.assert;
const user = new User;
const phone = new Phone;

module.exports = function() {

    describe("Base model properties", function() {

        it('should return correct table for the model', function(){
            assert.equal('users', user.table);
            assert.equal('phones', phone.table);
        });

        it('should return "id" for primary_key if not set on parent model', function(){
            assert.equal('id', user.primary_key);
        });

        it('should return custom primary_key if set on parent model', function(){
            assert.equal('phone_id', phone.primary_key);
        });

    });

};
