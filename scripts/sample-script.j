async function main() {
  const CrowdsourcedFunding = await ethers.getContractFactory("CrowdsourcedFunding");
  const crowdsourcedFunding = await CrowdsourcedFunding.deploy();

  console.log("Contract deployed to address:", crowdsourcedFunding.address);
}

main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1);
});
