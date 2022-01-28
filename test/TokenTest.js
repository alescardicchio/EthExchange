// test token totali al momento del deployment
const { assert } = require("chai");

var Token = artifacts.require("Token");

contract('Token', function(accounts){
    
    it('set token totali al deployment', function() {
        return Token.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 1000000, 'set token totali a 1,000,000');
        });
    });
})