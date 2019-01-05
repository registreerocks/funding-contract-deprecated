
var FundingContract = artifacts.require("./FundingContract.sol")

module.exports = function(deployer) {
    deployer.then(function() {
        return deployer.deploy(FundingContract);
    });
};