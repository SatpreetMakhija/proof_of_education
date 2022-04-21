const hre = require("hardhat");

async function main() {
  const UploadDoc = await hre.ethers.getContractFactory("FileUpload");
  const uploaddoc = await UploadDoc.deploy();

  await uploaddoc.deployed();

  console.log("UploadDoc deployed to:", uploaddoc.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
