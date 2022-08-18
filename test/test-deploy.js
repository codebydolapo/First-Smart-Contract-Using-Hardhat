const { ethers, run, network } = require('hardhat')
const {assert} = require('chai')

describe('SimpleStorage', () => {

  let simpleStorageFactory, simpleStorage

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a number of 0", async () => {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = '0'
    assert.equal(currentValue.toString(), expectedValue)
  })

  it('Should update stored value', async () => {
    const storedValue = 7
     const transactionResponse = await simpleStorage.store(7)
     await transactionResponse.wait(1)
     const retrievedValue = await simpleStorage.retrieve()
     assert.equal(retrievedValue, storedValue)
  })


})