const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("Portal");
  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
  console.log("Contract deployed by:", owner.address);
  
  let waveCount;
  waveCount = await contract.getTotalWaves();

  let waveTxn = await contract.wave();
  await waveTxn.wait();

  waveCount = await contract.getTotalWaves();
  
  waveTxn = await contract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await contract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
