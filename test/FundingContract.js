require('truffle-test-utils').init();
const {
    expectThrow
} = require('openzeppelin-solidity/test/helpers/expectThrow');
const {
    EVMRevert
} = require('openzeppelin-solidity/test/helpers/EVMRevert');


var FundingContract = artifacts.require("./FundingContract.sol");

contract('FundingContract', function (accounts) {
    it("should deposit 10 ether", function () {
        let FundingContractInstance;
        return FundingContract.deployed().then(function (instance) {
            FundingContractInstance = instance;
            return FundingContractInstance.deposit({
                from: accounts[0],
                value: web3.toWei(10, "ether")
            });
        }).then(function (result) {
            assert.web3Event(result, {
                event: 'Deposit',
                args: {
                    _from: accounts[0],
                    _value: Number(web3.toWei(10, "ether"))
                }
            }, 'The event is emitted');
        }).then(function () {
            return web3.eth.getBalance(FundingContractInstance.address);
        }).then(function (balance) {
            assert.equal(balance, Number(web3.toWei(10, "ether")), "Balance is not 10 ether.")
        });
    })

    it("should send 1 finney to account 8", function () {
        let account8Balance = web3.eth.getBalance(accounts[8]);
        return FundingContract.deployed().then(function (instance) {
            return instance.fund(
                accounts[8],
                { from: accounts[0] }
            );
        }).then(function (result) {
            assert.web3Event(result, {
                event: 'Fund',
                args: {
                    _to: accounts[8]
                }
            }, 'The event is emitted');
        }).then(function () {
            return web3.eth.getBalance(accounts[8]);
        }).then(function (balance) {
            assert.equal(Number(balance), Number(account8Balance) + Number(web3.toWei(1, "finney")), "Balance is not increase by 1 finney.")
        });
    })

    it("should not send another finney to account 8", function () {
        return FundingContract.deployed().then(function (instance) {
            expectThrow(instance.fund(
                accounts[8],
                { from: accounts[0] }
            ), EVMRevert);
        })
    })

    it("should not send 1 finney to account 7 because transaction not called from owner account", function () {
        return FundingContract.deployed().then(function (instance) {
            expectThrow(instance.fund(
                accounts[7],
                { from: accounts[7] }
            ), EVMRevert);
        })
    })

    it("should not withdraw balance from contract", function () {
        return FundingContract.deployed().then(function (instance) {
            expectThrow(instance.withdraw(
                { from: accounts[3] }
            ), EVMRevert);
        })
    })

    it("should withdraw balance from contract", function () {
        let FundingContractInstance;
        return FundingContract.deployed().then(function (instance) {
            FundingContractInstance = instance;
            return FundingContractInstance.withdraw({ from: accounts[0] })
        }).then(function(){
            assert.equal(web3.eth.getBalance(FundingContract.address), 0, "Contract balance is not 0")
        })
    })

    it("should not fund account 7 due to lack of funds in contract", function () {
        return FundingContract.deployed().then(function (instance) {
            expectThrow(instance.fund(
                accounts[7],
                { from: accounts[0] }
            ), EVMRevert);
        })
    })
});
