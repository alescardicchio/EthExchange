// test token totali al momento del deployment
const { assert } = require("chai");

var Token = artifacts.require("Token");

contract('Token', function(accounts){
    
    var tokenInstance;

    it('inizializza il contratto con i valori corretti', function() {
        return Token.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, 'RomaTre Token', 'il nome è corretto');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol, 'RM3', 'il simbolo è corretto');
        });
    });

    it('set token iniziali al deployment', function() {
        return Token.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 1000000, 'set token totali a 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(),1000000, 'assegnazione token all admin');
        });
    });

    
    it('trasferimento token', function() {
        return Token.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 99999999999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >=0, 'errore saldo insufficiente');
            return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
        }).then(function(success){
            assert.equal(success, true, 'torna true');
            return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggera un evento');
            assert.equal(receipt.logs[0].event, 'Transfer', 'dovrebbe essere evento "Transfer"');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'log da cui vengono trasferiti i token');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'log verso cui vengono trasferiti i token');
            assert.equal(receipt.logs[0].args._value, 250000, 'log l ammontare di token trasferiti');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 250000, 'token aggiunti all account destinatario');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 750000, 'token sottratti all account mittente');
        });
    });
})