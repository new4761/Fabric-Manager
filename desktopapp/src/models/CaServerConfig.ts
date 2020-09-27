// Class for create Config.yaml for Ca Sererver Config
// type of ca = root TLS | CA / intermediate CA
import fs from 'fs';
//import YAML from 'yaml';
const yaml = require('js-yaml');
import YamlConfig from './YamlConfig'
class CaServerConfig implements YamlConfig {
   //*************************************************
   // variables for export file
   fileName: string;
   defaultOutputPath: string;
   //************************************************
   // self Class variables
   version: string = "1.4.7";
   port: number = 7052;
   debug: boolean = true;
   crlsizelimit: number = 512000;
   crl = {
      expiry: "24h"
   };
   cors: CrossOriginConfig = new CrossOriginConfig();
   tls: TlsSettingConfig = new TlsSettingConfig();
   ca: CertificatesConfig = new CertificatesConfig();
   registry: RegistryConfig = new RegistryConfig();
   db: DatabaseConfig = new DatabaseConfig();
   ldap: LDAPConfig = new LDAPConfig();
   affiliations: Affiliations = {
      "businessunit1":
      {
         department1: ["team1"],
      },
      "businessunit2":
         ["department2",
            "department3"
         ]
   }
   signing: SigningConfig = new SigningConfig();
   csr: CSRConfig = new CSRConfig();
   idemix: IdemixConifg = new IdemixConfig();
   bccsp: BCCSPConfig = new BCCSPConfig();
   intermediate: IntermediateCA = new IntermediateCA();
   cacount = null;
   cafiles = null;
   cfg: CFG = new CFG();
   operations: Operations = new Operations();
   metrics: Metrics = new Metrics();
   // ****************************************
   //YamlConfig defalut Function
   constructor() {
      this.fileName = "fabric-ca-server-config.yaml";
      this.defaultOutputPath = "./test";
   }
   getUserInput(userInput: CaServerConfig) {
      console.log(userInput);
   }
   createFile() {
      let src = "# This file is Generate from YamlClass used to configuration file for the fabric-ca-server command.\n";
      src += "# Base on fabric-ca-server-config.yaml version:" + this.version + "\n \n";
      src += "################################################################### \n"
      src += "\n # Version of config file \n"
      src += yaml.dump({ "version": this.version });
      src += "\n # Server's listening port \n";
      src += yaml.dump({ 'port': this.port });
      src += this.cors.getComment();
      src += yaml.dump({ "cors": this.cors });
      src += "\n # Enables debug logging  \n"
      src += yaml.dump({ 'debug': this.debug });
      src += "\n # Size limit of an acceptable CRL in bytes \n"
      src += yaml.dump({ "crlsizelimit": this.crlsizelimit });
      src += this.tls.getComment();
      src += yaml.dump({ "tls": this.tls });
      src += this.ca.getComment();
      src += yaml.dump({ "ca": this.ca });
      src += "\n #  The gencrl REST endpoint configuration options \n";
      src += yaml.dump({ "crl": this.crl });
      src += this.registry.getComment();
      src += yaml.dump({ "registry": this.registry });
      src += this.db.getComment();
      src += yaml.dump({ "db": this.db });
      src += this.ldap.getComment();
      src += yaml.dump({ "ldap": this.ldap });
      src += "\n # Affiliations specified in this section are specified as maps.\n";
      src += yaml.dump({ "affilations": this.affiliations });
      src += this.signing.getComment();
      src += yaml.dump({ "signing": this.signing })
      src += this.csr.getComment();
      src += yaml.dump({ "csr": this.csr });
      src += this.idemix.getComment();
      src += yaml.dump({ "idemix": this.idemix });
      src += this.bccsp.getComment();
      src += yaml.dump({ "bccsp": this.bccsp });
      src += "\n # Multi CA section \n";
      src += yaml.dump({ "cacount": this.cacount });
      src += yaml.dump({ "cafiles": this.cafiles });
      src += this.intermediate.getComment();
      src += yaml.dump({ "intermediate": this.intermediate });
      src += this.cfg.getComment();
      src += yaml.dump({ "cfg": this.cfg });
      src += this.operations.getComment();
      src += yaml.dump({ "operations": this.operations });
      src += this.metrics.getComment();
      src += yaml.dump({ "metrics": this.metrics })
      this.saveFile(undefined, src);

   }
   saveFile(outputPath = this.defaultOutputPath, inputFileData: string) {

      try {
         fs.writeFileSync(outputPath + '/' + this.fileName, inputFileData, 'utf-8');
      }
      catch (e) {
         console.log(e);
      }
   }

   editFile(filePath: string, inputFileData: object) {

   }
   updateNetworkConfig() {

   }
   // *********************************************
   // Self function

}
interface ConfigData {
   getComment: () => string;
}
class CrossOriginConfig implements ConfigData {
   enabled: boolean = false;
   origins: string[] = ["*"];
   getComment() {
      let comment = "\n # Cross-Origin Resource Sharing (CORS) \n"
      return comment;

   }
}
class TlsSettingConfig implements ConfigData {
   enabled: boolean = false;
   //if root TLS ca should blank
   certfile: string = "ca-cert.pem";
   keyfile: string = "ca-key.pem";
   clientauth = {
      type: "noclientcert",
      certfiles: {}
   };
   getComment() {
      let comment = "\n # TLS section for the server's listening port \n"
      return comment;
   }
}
class CertificatesConfig implements ConfigData {
   name: string | null = null;
   keyfile: string = "ca-key.pem";
   certfile: string = "ca-cert.pem";
   chainfile: string = "ca-chain.pem";
   getComment() {
      let comment = "\n #  The CA section contains information related to the Certificate Authority \n"
      return comment;
   }

}
class RegistryConfig implements ConfigData {
   maxenrollments: number = -1;
   identities: Identities[] = [
      {
         name: "admin",
         pass: "adminpw",
         type: "client",
         affiliation: "",
         attrs: {
            "hf.Registrar.Roles": "*",
            "hf.Registrar.DelegateRoles": "*",
            "hf.Revoker": true,
            "hf.IntermediateCA": true,
            "hf.GenCRL": true,
            "hf.Registrar.Attributes": "*",
            "hf.AffiliationMgr": true
         }
      }
   ];
   getComment() {
      let comment = "\n#  The registry section controls how the fabric-ca-server things \n"
      return comment;
   }
}

interface Attrs {
   "hf.Registrar.Roles": string,
   "hf.Registrar.DelegateRoles": string,
   "hf.Revoker": boolean,
   "hf.IntermediateCA": boolean,
   "hf.GenCRL": boolean,
   "hf.Registrar.Attributes": string,
   "hf.AffiliationMgr": boolean
}

interface Identities {
   name: string;
   pass: string;
   type: string;
   affiliation: string;
   attrs: Attrs;
}
enum dataBaseType {
   sqlite3 = "sqlite3",
   mysql = "mysql",
   postgres = "postgres"
}
class DatabaseConfig implements ConfigData {

   type: dataBaseType = dataBaseType.sqlite3; // mysql || postgesql wait enum
   datasource: string = "fabric-ca-server.db";
   tls = {
      enabled: false,
      certfiles: ["db-server-cert.pem"],
      client: {
         certfile: "db-client-cert.pem",
         keyfile: "db-client-key.pem"
      }

   }
   getComment() {
      let comment = "\n# Database section  Supported types are: 'sqlite3', 'postgres', and 'mysql'. \n"
      return comment;
   }
}
interface ldapConfigValue {
   name: string | null,
   value: string | null
}
interface groupValue {
   [key: string]: ldapConfigValue[];
}
class LDAPConfig implements ConfigData {
   enabled: boolean = false;
   url: string = "ldap://<adminDN>:<adminPassword>@<host>:<port>/<base>";
   tls = {
      certfiles: ["ldap-server-cert.pem"],
      client: {
         certfile: "ldap-client-cert.pem",
         keyfile: "ldap-client-key.pem"

      }
   }
   attribute = {
      name: ['uid', 'member']
   }
   converters: ldapConfigValue[] = [{ name: null, value: null }]
   maps: groupValue =
      {
         "groups": [{
            name: null,
            value: null
         }]
      }
   getComment() {
      let comment = "\n #  LDAPConfig section\n";
      return comment;
   }
}
interface Affiliations {
   [key: string]: object | string[];
}
interface SigningDefault {
   usage: string[],
   expiry: string;
}
interface SigningProfiles {
   ca: {
      usage: string[],
      expiry: string,
      caconstraint: {
         isca: boolean,
         maxpathlen: number
      }
   }
}
class SigningConfig implements ConfigData {
   default: SigningDefault = {
      usage:
         ["digital signature"],
      expiry: "8760h"
   }
   profiles: SigningProfiles = {
      ca: {
         usage: [
            "cert sign", "crl sign"],
         expiry: "43800h",
         caconstraint: {
            isca: true,
            maxpathlen: 0
         }
      }
   }
   tls: SigningDefault = {
      usage: [
         "signing", "key encipherment", "server auth", "client auth", "key agreement"
      ],
      expiry: "8760h"

   }
   getComment() {
      let commnet = "\n # Signing section is used to sign certificates \n"
      return commnet;
   }
}
interface CSRKey {
   algo: string,
   size: number
}
interface CSRNames {
   C: string;
   ST: string;
   L: string;
   O: string;
   OU: string;
}
interface CSRCa {
   expiry: string,
   pathlength: number
}
class CSRConfig implements ConfigData {
   cn: string = "demoname";
   keyrequest: CSRKey = {
      algo: "ecdsa",
      size: 256
   };
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
class IdemixConfig implements ConfigData {
   rhpoolsize: number = 1000;
   nonceexpiration: string = "15s";
   noncesweepinterval: string = "15m";
   getComment() {
      let comment = "\n # Credential. This section specifies configuration for the issuer component \n";
      return comment;
   }
}
interface BccspSw {
   hash: string,
   security: number,
   filekeystore: {
      keystore: string
   }
}
class BCCSPConfig implements ConfigData {
   default: string = "SW";
   sw: BccspSw = {
      hash: "SHA2",
      security: 256,
      filekeystore: {
         keystore: "msp/keystore"
      }
   }
   getComment() {
      let comment = "\n # BCCSP (BlockChain Crypto Service Provider) section is used to select which \n # crypto library implementation to use \n"
      return comment;
   }

}
interface IcaParentServer {
   url: string | null,
   caname: string | null
}
interface IcaEnrollment {
   hosts: string | null,
   profile: string | null,
   label: string | null,
}
class IntermediateCA implements ConfigData {
   parentserver: IcaParentServer = {
      url: null,
      caname: null
   };
   enrollment: IcaEnrollment = {
      hosts: null,
      profile: null,
      label: null
   };
   tls = {
      certfiles: ["ica-server-cert.pem"],
      client: {
         certfile: "ica-client-cert.pem",
         keyfile: "ica-client-key.pem"
      }
   }
   getComment() {
      let comment = "\n # Intermediate CA section \n";
      return comment;
   }
}
interface CFGiden {
   passwordattempts: number
}
class CFG implements ConfigData {
   identities: CFGiden = {
      passwordattempts: 10

   }
   getComment() {
      let comment = "\n # CA configuration section \n"
      return comment;
   }
}
interface OperationTLS {
   enabled: boolean,
   cert: {
      file: string | null
   },
   key: {
      file: string | null
   },
   clientAuthRequired: boolean,
   clientRootCAs: {
      files: string[]
   }
}
class Operations implements ConfigData {
   listenAddress: string = "127.0.0.1:9443";
   tls: OperationTLS = {
      enabled: false,
      cert: {
         file: null
      },
      key: {
         file: null
      },
      clientAuthRequired: false,
      clientRootCAs: {
         files: []
      }
   }
   getComment() {
      let comment = "\n # Operations section \n"
      return comment;
   }
}
interface MetricsStats {
   network: string,
   address: string,
   writeInterval: string,
   prefix: string
}
class Metrics implements ConfigData {
   provider: string = "disabled";
   statsd: MetricsStats = {
      network: "udp",
      address: "127.0.0.1:8125",
      writeInterval: "10s",
      prefix: "server"
   }
   getComment() {
      let comment = "\n #    Metrics section \n";
      return comment;
   }
}

export default new CaServerConfig();
