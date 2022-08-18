const { ethers, run, network } = require('hardhat')
const fs = require('fs-extra')



async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')

  console.log('Deploying... Please Wait!');
  const simpleStorage = await SimpleStorageFactory.deploy(); //DEPPLOYS THE CONTRACT FACTORY
  await simpleStorage.deployed(); //DEPLOYS THE CONTRACT IT CREATED WITH THE FACTORY

  console.log(`Deployed Contract To: ${simpleStorage.address} `)

  const initialValue = await simpleStorage.retrieve();
  console.log(`Initial value was ${initialValue}`);
  const updateValue = await simpleStorage.store(7);
  await updateValue.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is ${updatedValue}`);

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, []);
  }
}

async function verify(contractAddress, args) {
  console.log('Veriifying Contract...')
  try {
    await run('verify: verify', {
      address: contractAddress,
      constructorArguments: args
    })
  }

  catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified')
    } else {
      console.log(e)
    }
  }

}

main().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error(error)
  process.exit(1)
})