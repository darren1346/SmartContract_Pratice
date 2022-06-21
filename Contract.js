var fs=require("fs");
var Web3=require('web3');
var web3=new Web3( new Web3.providers.HttpProvider("http://localhost:8545") );
var solc = require('solc');
//console.log( "Web3 is connected? ",web3.isConnected() );

//compiler sol
var input = fs.readFileSync('Storage.sol','utf-8');
var output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':Storage'].bytecode;
const abi = JSON.parse(output.contracts[':Storage'].interface);


//unlock accounts[0]
var usrs=web3.eth.accounts;
web3.personal.unlockAccount(usrs['0'],'3a717134');
// Contract object
const contract = web3.eth.contract(abi);
// Deploy contract instance
const contractInstance = contract.new({
    data: '0x' + bytecode,
    from: usrs[0],
    gas: 90000*2
}, (err, res) => {
    if (err) {
      console.log('ERROR:',err);
      return;
    }
    if( !res.address ) {
      console.log('You must in the miner.start() for GAS');
      console.log('Deploy Hash:',res.transactionHash);// Log the tx, you can explore status with eth.getTransaction()
    }
    else {
      // If we have an address property, the contract was deployed.
      // and then test the deployed contract, it will call set with 3999
      const contractInstance = contract.at(res.address);
      var setHash=contractInstance.set.sendTransaction(3999,{from:web3.eth.accounts[0],gas:90000*2})
      console.log('You must in the miner.start() for GAS');
      console.log('Set Value Hash:',setHash);

      //write arress and abi information to Contract.log
      var logData=res.address+'\n'+output.contracts[':Storage'].interface+'\n';
      console.log(logData);
      fs.writeFileSync('Contract.log',logData);
    }
});

