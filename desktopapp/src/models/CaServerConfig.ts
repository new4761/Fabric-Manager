// // Class for create Config.yaml for Ca Sererver Config
// // type of ca = root TLS | CA / intermediate CA
// import fs from 'fs';
// //import YAML from 'yaml';
// const yaml = require('js-yaml');
// import YamlConfig from './YamlConfig'
// class CaServerConfig implements YamlConfig {
//    //************************************************* 
//    // variables for export file
//    fileName: string;
//    defaultOutputPath: string;
//    //************************************************
//    // self Class variables
//    version: string = "1.4.7";
//    port: number = 7052;
//    debug: boolean = true;
//    crlsizelimit: number = 512000;
//    crl = {
//       expiry: "24h"
//    };
//    csr: CrossOriginConfig = new CrossOriginConfig();
//    tls: TlsSettingConfig = new TlsSettingConfig();
//    affiliations: Affiliations = {
//       "businessunit1":
//       {
//          department1: ["team1"],
//       },
//       "businessunit2":
//          ["department2",
//             "department3"
//          ]
//    }
//    cacount: null;
//    cafiles: null;
//    // ****************************************   
//    //YamlConfig defalut Function
//    constructor() {
//       this.fileName = "fabric-ca-server-config.yaml";
//       this.defaultOutputPath = "./test";
//    }
//    getUserInput(userInput: CaServerConfig) {
//       console.log(userInput);
//    }
//    createFile() {

//    }
//    saveFile(outputPath = this.defaultOutputPath, inputFileData: string) {

//       try {
//          fs.writeFileSync(outputPath + '/' + this.fileName, inputFileData, 'utf-8');
//       }
//       catch (e) {
//          console.log(e);
//       }
//    }

//    editFile(filePath: string, inputFileData: object) {

//    }
//    updateNetworkConfig() {

//    }
//    // *********************************************
//    // Self function


//    myReadFile() {
//       //console.log(fs);

//       //const file = fs.readFileSync('./src/models/fabric-ca-server-config.yaml', 'utf8');
//       let src = yaml.dump(new CaServerConfig());
//       src += "## this is test comment";
//       this.saveFile(undefined, src);
//    }

// }
// class CrossOriginConfig {


// }
// class TlsSettingConfig {
//    enabled: boolean = false;
//    //if root TLS ca should blank
//    certfile: string = "ca-cert.pem";
//    keyfile: string = "ca-key.pem";
//    clientauth = {
//       type: "noclientcert",
//       certfiles: {}
//    };
// }
// class CertificatesConfig {
//    name: string;
//    keyfile: string = "ca-key.pem";
//    certfile: string = "ca-cert.pem";
//    chainfile: string = "ca-chain.pem";
//    constructor(org_name: string) {
//       this.name = org_name;
//    }
// }
// class RegistryConfig {
//    maxenrollments: number = -1;
//    identities: Identities[] = [];
// }

// interface Attrs {
//    hf_Registrar_Roles: string,
//    hf_Registrar_DelegateRoles: string,
//    hf_Revoker: boolean,
//    hf_IntermediateCA: boolean,
//    hf_GenCRL: boolean,
//    hf_Registrar_Attributes: string,
//    hf_AffiliationMgr: boolean
// }

// class Identities {
//    name: string;
//    pass: string;
//    type: string;
//    affiliation: string = "";
//    attrs: Attrs;
//    constructor(name: string, pass: string, type: string, attrs: Attrs) {
//       this.name = name;
//       this.pass = pass;
//       this.type = type;
//       this.attrs = attrs;
//    }
// }
// enum dataBaseType {
//    sqlite3 = "sqlite3",
//    mysql = "mysql",
//    postgres = "postgres"
// }
// class DatabasConfig {
//    type: dataBaseType = dataBaseType.sqlite3; // mysql || postgesql wait enum
//    datasource: string = "fabric-ca-server.db";
//    tls = {
//       enabled: false,
//       certfiles: ["db-server-cert.pem"],
//       client: {
//          certfile: "db-client-cert.pem",
//          keyfile: "db-client-key.pem"
//       }

//    }
// }
// interface ldapValue {
//    name: string
//    value: string
// }
// interface groupValue {
//    [key: string]: ldapValue[];
// }
// class LDAP {
//    enabled: boolean = false;
//    url: string = "ldap://<adminDN>:<adminPassword>@<host>:<port>/<base>"
//    tls = {
//       certfiles: ["ladp-server-cert.pem"],
//       client: {
//          certfile: "ladp-client-cert.pem",
//          keyfile: "ladp-client-key.pem"

//       }
//    }
//    attribute = {
//       name: ['uid', 'member']
//    }
//    converters: ldapValue[] = [{ name: null, value: null }]
//    maps: groupValue[] = {}
// }
// interface Affiliations {
//    [key: string]: object | string[];
// }
// interface SigningDefault {
//    usage: string[],
//    expiry: string;
// }
// interface SigningProfiles {
//    ca: {
//       usage: string[],
//       expiry: string,
//       caconstraint: {
//          isca: boolean,
//          maxpathlen: number
//       }
//    }
// }
// class Signing {
//    default: SigningDefault = {
//       usage:
//          ["digital signature"],
//       expiry: "8760h"
//    }
//    profiles: SigningProfiles = {
//       ca: {
//          usage: [
//             "cert sign", "crl sign"],
//          expiry: "43800h",
//          caconstraint: {
//             isca: true,
//             maxpathlen: 0
//          }
//       }
//    }
//    tls: SigningDefault = {
//       usage: [
//          "signing", "key encipherment", "server auth", "client auth", "key agreement"
//       ],
//       expiry: "8760h"

//    }
// }
// interface CSRKey {
//    algo: string,
//    size: number
// }
// interface CSRNames {
//    C: string;
//    ST: string;
//    L: string;
//    O: string;
//    OU: string;
// }
// interface CSRCa {
//    expiry: string,
//    pathlength: number
// }
// class CSR {
//    cn: string = "demoname";
//    keyrequest: CSRKey = {
//       algo: "ecdsa",
//       size: 256
//    };
//    names: CSRNames[] = [
//       {
//          C: "US",
//          ST: "\" North Carolina \"",
//          L: "\"demo\"",
//          O: "Hyperledger",
//          OU: " Fabric"
//       }
//    ];
//    host: string[] = ["localhost"];
//    ca: CSRCa = {
//       expiry: "131400h",
//       pathlength: 1
//    }
// }
// class Idemix {
//    rhpoolsize: number = 1000;
//    nonceexpiration: string = "15s";
//    noncesweepinterval: string = "15m"
// }
// interface BccspSw {
//    hash: string,
//    security: number,
//    filekeystore: {
//       keystore: string
//    }
// }
// class BCCSP {
//    default: string = "SW";
//    sw: BccspSw = {
//       hash: "SHA2",
//       security: 256,
//       filekeystore: {
//          keystore: "msp/keystore"
//       }
//    }

// }
// interface IcaParentServer {
//    url: string | null,
//    caname: string | null
// }
// interface IcaEnrollment {
//    hosts: string | null,
//    profile: string | null,
//    label: string | null,
// }
// class IntermediateCA {
//    parentserver: IcaParentServer = {
//       url: null,
//       caname: null
//    };
//    enrollment: IcaEnrollment = {
//       hosts: null,
//       profile: null,
//       label: null
//    };
//    tls = {
//       certfiles: ["ica-server-cert.pem"],
//       client: {
//          certfile: "ica-client-cert.pem",
//          keyfile: "ica-client-key.pem"
//       }
//    }
// }
// interface CFGiden {
//    passwordattempts: number
// }
// class CFG {
//    identities: CGiden = {
//       passwordattempts: 10

//    }
// }
// interface OperationTLS {
//    enabled: boolean,
//    cert: {
//       file: string | null
//    },
//    key: {
//       file: string | null
//    },
//    clientAuthRequired: boolean,
//    clientRootCAs: {
//       files: string[]
//    }
// }
// class Operations {
//    listenAddress: string = "127.0.0.1:9443";
//    tls: OperationTLS = {
//       enabled: false,
//       cert: {
//          file: null
//       },
//       key: {
//          file: null
//       },
//       clientAuthRequired: false,
//       clientRootCAs: {
//          files: []
//       }
//    }

// }
// interface MetricsStats {
//    network: string,
//    address: string,
//    writeInterval: string,
//    prefix: string
// }
// class Metrics {
//    provider: string = "disabled";
//    statsd: MetricsStats = {
//       network: "udp",
//       address: "127.0.0.1:8125",
//       writeInterval: "10s",
//       prefix: "server"
//    }
// }

// export default new CaServerConfig();
