
const { Gateway, Wallets } = require("fabric-network");
const fs = require("fs");
const yaml = require("js-yaml");
// read a common connection profile in yaml format
let profilePath = "./profiles/mychannel_connection_for_nodesdk.yaml";



main();
async function main() {
  try {
    const wallet =await  Wallets.newFileSystemWallet('./profiles/vscode/wallets/org2.haha');
    console.log(await wallet.list())
    
  } catch (error) {
    console.error(`******** FAILED to run the application: ${error}`);
  }
}
