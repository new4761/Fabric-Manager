// Class for create Config.yaml for Client Config
//import YAML from 'yaml';
const yaml = require('js-yaml');
import { YamlConfig } from "yaml-config";
import { BCCSPConfig } from "../module/BCCSPConfig";
import { ConfigData, CSRKey, CSRNames, CSRCa } from "ConfigData";
import {FileYamlBuilder} from "../module/FileYamlBuilder"
class CaClientConfig extends FileYamlBuilder implements YamlConfig {

   //*************************************************
   // variables for export file
   fileName: string;
   defaultOutputPath: string
   //***************************************************
   //self Class Variables
   url: string = "http://localhost:7054";
   mspdir: string = "msp"
   tls: TlsSettingConfig = new TlsSettingConfig();
   csr: CSRConfig = new CSRConfig();
   id: RegistryConfig = new RegistryConfig();
   enrollment: EnrollmentConfig = new EnrollmentConfig();
   caname: string | null = null;
   bccsp: BCCSPConfig = new BCCSPConfig();
   //YamlConfig defalut Function
   constructor() {
      super();
      // define file name and dafault path
      this.fileName = "fabric-ca-client-config.yaml";
      this.defaultOutputPath = "./tests";
   }
   // call funtion to get user input
   getUserInput(userInput: CaClientConfig) {
      console.log(userInput);
   }
   createFile() {
      let src = "# This file is Generate from YamlClass used to configuration file  fabric-ca-client \n";
      src += "################################################################### \n"
      src += "\n # URL of the Fabric-ca-server \n";
      src += yaml.dump({ 'url': this.url });
      src += "\n # Membership Service Provider (MSP) directory \n"
      src += yaml.dump({ "mspdir": this.mspdir });
      src += this.tls.getComment();
      src += yaml.dump({ 'tls': this.tls });
      src += this.csr.getComment();
      src += yaml.dump({ 'csr': this.csr });
      src += this.id.getComment();
      src += yaml.dump({ 'id': this.id });
      src += this.enrollment.getComment();
      src += yaml.dump({ "enrollement": this.enrollment });
      src += "\n # Name of the CA to connect to within the fabric-ca server \n"
      src += yaml.dump({ 'caname': this.caname });
      src += this.bccsp.getComment();
      src += yaml.dump({ 'bccsp': this.bccsp });
      this.saveFile(this.defaultOutputPath, src,this.fileName);
   }
   editFile(filePath: string, inputFileData: object) {

   }

   updateNetworkConfig() {

   }
}
class TlsSettingConfig implements ConfigData {
   certfiles: string = "root.pem";
   client = {
      certfile: "tls-client-cert.pem",
      keyfile: "tls-client-key.pem"
   }
   getComment() {
      let comment = "\n #    TLS section for secure socket connection \n"
      return comment;
   }
}
class EnrollmentConfig implements ConfigData {
   profile: string | null = null;
   label: string | null = null;
   getComment() {
      let comment = "\n # Certificate Signing Request section for generating the CSR \n";
      return comment;
   }

}
// data class for csr section
class CSRConfig implements ConfigData {
   cn: string = "demoname";
   keyrequest: CSRKey = {
      algo: "ecdsa",
      size: 256
   };
   serialnumber:number|null =null;
   names: CSRNames[] = [
      {
        C: "US",
         ST: "\"North Carolina\"",
         L: "\"demo\"",
         O: "Hyperledger",
         OU: "Fabric"
      }
   ];
   host: string[] = ["localhost"];
   ca: CSRCa = {
      expiry: "131400h",
      pathlength: 1
   }
   getComment() {
      let comment = "\n #  Certificate Signing Request (CSR) section.\n";
      return comment;
   }
}
class RegistryConfig implements ConfigData {
   name: string | null = null;
   type: string | null = null;
   affiliation: string | null = null;
   attribute: AttributeData[] | null = null;
   getComment() {
      let comment = "\n # Registration section used to register a new user with fabric-ca server \n";
      return comment;
   }
}
interface AttributeData {
   name: string,
   value: string
}
export default new CaClientConfig();

