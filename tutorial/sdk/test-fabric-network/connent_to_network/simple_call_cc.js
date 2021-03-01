
const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const yaml = require("js-yaml");
// read a common connection profile in yaml format
let profilePath = "./profiles/mychannel_connection_for_nodesdk.yaml";



main();
async function main() {
  try {
    const wallet =await  Wallets.newFileSystemWallet('./profiles/vscode/wallets/peer.testa');
    // console.log(await wallet.list())
    
    const data = fs.readFileSync(profilePath);
    const connectionProfile = yaml.safeLoad(data);
    // use the loaded connection profile
    const gateway = new Gateway();
    await gateway.connect(connectionProfile, { wallet, identity: 'Admin',
      discovery: { enabled: true, asLocalhost: true },
    });
    const network = await gateway.getNetwork("mychannel");
    const contract = network.getContract('simple');
  // await contract.submitTransaction('query','b');
   //  result = await contract.createTransaction('GetMetadata');
   result = await contract.evaluateTransaction('query',['a']);
    // metadata = JSON.parse(result.toString('utf8'));
    await gateway.disconnect();
 console.log(result.toString())
  } catch (error) {
    console.error(`******** FAILED to run the application: ${error}`);
  }
}
