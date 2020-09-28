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
   // Base fabric ca version file
   version: string = "1.4.7";
   // port to provide ca
   // need to unique port
   port: number = 7052;
   // set Debug to log error and server status
   // set is true for healthcare debug
   debug: boolean = true;
   // Size limit of an acceptable CRL (Certificate Revocation List)  in bytes
   crlsizelimit: number = 512000;
   //used during gencrl request processing
   //Specifies expiration for the generated CRL. The number of hours (UTC time)
   crl = {
      expiry: "24h"
   };
   // # Cross-Origin Resource Sharing (CORS) -> HTTPS call HTTP
   // ** optionals **
   // default : disabled
   cors: CrossOriginConfig = new CrossOriginConfig();
   // # TLS section for the ca server
   // ** optionals **
   // default enabled (for best pratice)
   // ********************************
   // keyfile: tls-ca-key.pem
   // certfile: tls-ca-cert.pem
   // type : noclientcert (wait to upgrade)
   tls: TlsSettingConfig = new TlsSettingConfig();
   //  # The CA section contains information
   //  ** auto input **
   //  name : org-name
   //  **************************
   //  keyfile: ca-key.pem
   //  certfile: ca-cert.pem
   //  chainfile: ca-chain.pem 
   ca: CertificatesConfig = new CertificatesConfig();
   //  # The registry section controls
   //  # if Used LDAP this "registry" section is ignored (default used registry)
   //  ** optionals **
   //  # Maximum number of times a password/secret can be reused for enrollment
   //  # (default: -1, which means there is no limit)
   //  maxenrollments: -1
   //  # add default identities (this version add name:admin pass:adminpw 
   //  type:client affilition:"" attrs:can do every thing) remove default if user input admins details
   //  identities:Contains *Array* of identity information
   //  *** identities details ****
   //           name: request
   //           pass: request
   //           type: request (base type on Network Config)
   //           affiliation : option (base on affiliation section in org data)
   //            attrs: user premisson config (read doc in api design for options)
   registry: RegistryConfig = new RegistryConfig();
   //  # Database section  Supported types are: 'sqlite3', 'postgres', and 'mysql'. 
   //  # don't make any input right now
   //  # wait to upgrade
   //  ************************************
   //  certfiles: db-server-cert.pem
   //  clien
   //  certfile: db-client-cert.pem
   //  keyfile: db-client-key.pem
   db: DatabaseConfig = new DatabaseConfig();
   //  # LDAPConfig section
   //  # don't make any input right now
   //  # wait to upgrade
   //  # If LDAP is enabled, the fabric-ca-server calls LDAP to do registry section work
   ldap: LDAPConfig = new LDAPConfig();
   //  # Affiliations specified in this section are specified as maps.
   //  # ** don't use default data is sample for log yaml file
   //  # make data to blank if user not input
   //  ** optionals **
   //  affilations:array of Affilations interface (object | array of string)
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
   // # Signing section used to sign enrollment certificates;
   // # don't make any input right now
   signing: SigningConfig = new SigningConfig();
   // # Certificate Signing Request (CSR) section.
   // cn is the Common Name (request)
   // O is the organization name (auto input)
   // ******** optionals ***************
   // OU is the organizational unit
   // L is the location or city
   // ST is the state
   // C is the country
   // *********************
   // host and ca wait to upgrade (use default right now)
   csr: CSRConfig = new CSRConfig();
   // # Credential. This section specifies configuration for the issuer component 
   // # use default right now (wait to upgrade)
   idemix: IdemixConfig = new IdemixConfig();
   // # BCCSP (BlockChain Crypto Service Provider) section is used to select which 
   // # crypto library implementation to use 
   // # use default right now (wait to upgrade)
   bccsp: BCCSPConfig = new BCCSPConfig();
   // # Intermediate CA section 
   // # use default right now (wait to upgrade)
   // *****************************************
   // tls:
   //   certfile: ica-server-cert.pem
   //   client:
   //     certfile: ica-client-cert.pem
   //     keyfile: ica-client-key.pem 
   intermediate: IntermediateCA = new IntermediateCA();
   // # Multi CA section 
   // # use default right now (wait to upgrade)
   cacount = null;
   cafiles = null;
   // # CA configuration section 
   // # use default right now (wait to upgrade)
   cfg: CFG = new CFG();
   // # Operations section  
   // # use default right now (wait to upgrade)
   // # need to know port to use
   operations: Operations = new Operations();
   // # Metrics section 
   // # use default right now (wait to upgrade)
   // # need to know port to use
   metrics: Metrics = new Metrics();
   // ****************************************
   //YamlConfig defalut Function
   constructor() {
      // define file name and dafault path 
      this.fileName = "fabric-ca-server-config.yaml";
      this.defaultOutputPath = "./test";
   }
   // call funtion to get user input
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
// Interface for call data class
interface ConfigData {
   getComment: () => string;
}
// data class for define cors section
class CrossOriginConfig implements ConfigData {
   enabled: boolean = false;
   origins: string[] = ["*"];
   getComment() {
      let comment = "\n # Cross-Origin Resource Sharing (CORS) \n"
      return comment;

   }
}
// data class for define tls section
class TlsSettingConfig implements ConfigData {
   enabled: boolean = true;
   //if root TLS ca should blank
   certfile: string = "tls-ca-cert.pem";
   keyfile: string = "tls-ca-key.pem";
   clientauth = {
      type: "noclientcert",
      certfiles: {}
   };
   getComment() {
      let comment = "\n # TLS section for the server's listening port \n"
      return comment;
   }
}
// data class for define ca section
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
// data class for define registry section
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

// interface for define attrs patten data (all input in api design)
// Used in Identities interface
interface Attrs {
   "hf.Registrar.Roles": string,
   "hf.Registrar.DelegateRoles": string,
   "hf.Revoker": boolean,
   "hf.IntermediateCA": boolean,
   "hf.GenCRL": boolean,
   "hf.Registrar.Attributes": string,
   "hf.AffiliationMgr": boolean
}
// interface for create user identities used in RegistryConfig
interface Identities {
   name: string;
   pass: string;
   type: string;
   affiliation: string;
   attrs: Attrs;
}
// type of data base for ca server
enum dataBaseType {
   sqlite3 = "sqlite3",
   mysql = "mysql",
   postgres = "postgres"
}
// data class for db section
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
// need to write later
interface ldapConfigValue {
   name: string | null,
   value: string | null
}
// need to write later
interface groupValue {
   [key: string]: ldapConfigValue[];
}
// data class for ldap section
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
// interface for affiliation section
interface Affiliations {
   [key: string]: object | string[];
}

// interface for default object in signing section
interface SigningDefault {
   usage: string[],
   expiry: string;
}
// interface for profiles object in signing section
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
// data class for signing section
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
// interface for define algoritem in csr
interface CSRKey {
   algo: string,
   size: number
}
// interface for details to csr
interface CSRNames {
   C: string;
   ST: string;
   L: string;
   O: string;
   OU: string;
}
// ca details for old and ica
interface CSRCa {
   expiry: string,
   pathlength: number
}
// data class for csr section
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
// data class for idemix section
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
//data class for bccsp section
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
// data class for intermediate section
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
// data class for cfg section
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
//data class for operations section
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
// data class for metrics section
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
