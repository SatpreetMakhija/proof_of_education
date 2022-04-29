require("@nomiclabs/hardhat-waffle");

const metamask_private_key = "..."

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts:  "./src/artifacts", //This ensures that all our smart contract code gets accessible to the React App in the 'src' folder.
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url:"https://ropsten.infura.io/v3/92dc75fc592f45c4b6fa3150bfb1ea90",
      accounts: [metamask_private_key],
    },
  },
};
