
//npm install fabric-network
const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const yaml = require("js-yaml");


//Test Call Gateway 
ExampleGateway();


//ExampleGateway  function
const gateway = new Gateway();
async function ExampleGateway() {
  try {
    // Connect to a gateway peer
    let connectionProfilePath = "./profiles/mychannel_connection_for_nodesdk.yaml";
    // Get wallet identity 
    const wallet =await  Wallets.newFileSystemWallet('./wallets/peer.qweasdasad'); // Example ./wallets/Org1 || ./wallets/Org2
    const connectionProfileData = fs.readFileSync(connectionProfilePath);
    const connectionProfile = yaml.safeLoad(connectionProfileData);
    //console.log(connectionProfile)
    //Connect to gateway to localhost with wallet identity 
    const identity = await wallet.get('asdwqwe');
    await gateway.connect(connectionProfile,{
      wallet, identity,discovery: { enabled: true, asLocalhost: true },  // Previously imported identity
  });
  const network = await gateway.getNetwork('mychannel');
  //console.error(`successful connection`);
  console.log(network)
  } catch (error) {
    console.error(`******** FAILED : ${error}`);
  }
  finally {
    // Disconnect from the gateway peer when all work for this client identity is complete
    gateway.disconnect();
}
}

