import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployVendor: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  
  // // Deploy Vendor
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const yourToken = await hre.ethers.getContract<Contract>("YourToken", deployer);
  const yourTokenAddress = await yourToken.getAddress();
  const vendorDeployment = await deploy("Vendor", {
    from: deployer,
    // Contract constructor arguments
    args: [yourTokenAddress],
    log: true,
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
  const vendor = await hre.ethers.getContract<Contract>("Vendor", deployer);
  const vendorAddress = await vendor.getAddress();
  // // Transfer tokens to Vendor
  await yourToken.transfer(vendorAddress, hre.ethers.parseEther("1000"));
  // // Transfer contract ownership to your frontend address
  await vendor.transferOwnership("0xd0D22EE2dbf27cc4747e6B4e2dBf1Ab2EE7ca437");
};

export default deployVendor;

// e.g. yarn deploy --tags Vendor
deployVendor.tags = ["Vendor"];
