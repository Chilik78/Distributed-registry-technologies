const Token = artifacts.require("./Token.sol");

module.exports = async function (deployer) {
    const deployment = deployer.deploy(Token, "DChelToken", "DChTkn", 10000n * BigInt(1e18));
    const instance = await deployment.await
    const newOwner = '0x22D90Cc09D0Bb030D98bB6b346cB7a2A6E1B1D42'
    await instance.transferOwnership(newOwner)
};