import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "Vendor" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployVendor: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Get the deployed YourToken contract
  const yourToken = await hre.ethers.getContract<Contract>("YourToken", deployer);
  const yourTokenAddress = await yourToken.getAddress();

  // Mint tokens to the deployer account (if your token contract has a mint function)
  const mintAmount = hre.ethers.utils.parseUnits("10000", 18); // Adjust the amount and decimals as needed
  await yourToken.mint(deployer, mintAmount); // Ensure your YourToken contract has a mint function

  // Deploy the Vendor contract
  const vendorDeployment = await deploy("Vendor", {
    from: deployer,
    args: [yourTokenAddress],
    log: true,
    autoMine: true,
  });

  const vendorAddress = vendorDeployment.address;

  // Transfer tokens to Vendor
  await yourToken.transfer(vendorAddress, hre.ethers.utils.parseUnits("1000", 18)); // Transfer 1000 tokens

  // Transfer contract ownership to your frontend address
  await yourToken.transferOwnership("0xd0D22EE2dbf27cc4747e6B4e2dBf1Ab2EE7ca437");
};

export default deployVendor;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags Vendor
deployVendor.tags = ["Vendor"];