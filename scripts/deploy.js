const hre = require("hardhat");

async function main() {
  const Agrodao = await hre.ethers.getContractFactory("Agrodao");
  const agrodao = await Agrodao.deploy();

  await agrodao.deployed();
  console.log(
      "Agrodao deployed to:", agrodao.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})