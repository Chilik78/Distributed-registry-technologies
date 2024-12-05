const Poster = artifacts.require("Poster");

module.exports = async function (deployer) {
    const deployment = deployer.deploy(Poster, "0x0000000000000000000000000000000000000000", 0);
    const instance = await deployment.await
    const newOwner = '0x22D90Cc09D0Bb030D98bB6b346cB7a2A6E1B1D42'
    await instance.transferOwnership(newOwner)
};