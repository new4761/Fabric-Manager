// version 0.1
// Class for create Config.yaml for orderer Config

import fs from 'fs';
const yaml = require('js-yaml');
import YamlConfig from './YamlConfig'

class OrdererConfig implements YamlConfig {
  //*************************************************
  // variables for export file
  fileName: string;
  defaultOutputPath: string;
  ymlString: string = "";
  //************************************************
  // Class variables


  General: GeneralConfig = new GeneralConfig();
  FileLedger: FileLedgerConfig = new FileLedgerConfig();
  Kafka: KafkaConfig = new KafkaConfig();
  Debug: DebugConfig = new DebugConfig();
  Operations: OperationConfig = new OperationConfig();
  Metrics: MetricsConfig = new MetricsConfig();
  Consensus: ConsensusConfig = new ConsensusConfig();


  //****************************************
  //YamlConfig default Function

  constructor() {
    this.fileName = "orderer.yaml";
    this.defaultOutputPath = "./test";
  }

  getUserInput(userInput: OrdererConfig) {
    console.log(userInput);
  }

  //writing a string from objects and bundle them together and return the string to component.
  createFile() {

    //file header
    this.ymlString += "# This file is Generate from YamlClass used to configuration file for the ordering service.\n";
    this.ymlString += "# Base on Orderer.yaml" + "\n \n";
    this.ymlString += "################################################################### \n"

    //main configuration
    this.ymlString += "\n # General config  \n"
    this.ymlString += yaml.safeDump({ "Genetal": this.General });
    this.ymlString += "\n # FileLedger config  \n"
    this.ymlString += yaml.safeDump({ "FileLedger": this.FileLedger });
    this.ymlString += "\n # Kafka config  \n"
    this.ymlString += yaml.safeDump({ "Kafka": this.Kafka });
    this.ymlString += "\n # Debug config  \n"
    this.ymlString += yaml.safeDump({ "Debug": this.Debug });
    this.ymlString += "\n # Operations config  \n"
    this.ymlString += yaml.safeDump({ "Operations": this.Operations });
    this.ymlString += "\n # Metrics config  \n"
    this.ymlString += yaml.safeDump({ "Metrics": this.Metrics });

    //return a string to component
    return this.ymlString;
  }

 //saving a file to a given path and yamldata.
 //if variable is not declare, use default variable.
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
  //   users.find({}).sort({name: 1}).exec(function(err: any, docs: any[]) {
  //     docs.forEach(function(d) {
  //         console.log('Found user:', d.name);
  //     });
  // });
  }

}


//*************************************************
// general config
class GeneralConfig {

  ListenAddress: string = '127.0.0.1';
  ListenPort: number = 7052;
  TLS: TLSConfig = new TLSConfig();
  Keepalive: KeepaliveConfig = new KeepaliveConfig();
  Cluster: ClusterConfig = new ClusterConfig();
  BootstrapMethod: string = 'file';
  BootstrapFile: string | null = null;
  LocalMSPDir: string = 'msp';
  LocalMSPID: string = 'SampleOrg';
  Profile: ProfileConfig = new ProfileConfig();
  BCCSP: BCCSPConfig = new BCCSPConfig();
  Authentication: AuthenticationConfig = new AuthenticationConfig;

}

//TLS settings for the GRPC server.
class TLSConfig {
  Enabled: boolean = false;
  PrivateKey: string = 'tls/server.key';
  Certificate: string = 'tls/ca.crt';
  RootCAs: Array<string> = ['tls/ca.crt'];
  ClientAuthRequired: boolean = false;
  ClientRootCAs: number | null = null

}

//Keepalive settings for the GRPC server.
class KeepaliveConfig {
  ServerMinInterval: string = '60s';
  ServerInterval: string = '7200s';
  ServerTimeout: string = '20s'
}

//Cluster settings for ordering service nodes that communicate with other ordering service nodes
class ClusterConfig {
  SendBufferSize: number = 10;
  ClientCertificate: string | null = null;
  ClientPrivateKey: string | null = null;
  ListenPort: string | null = null;
  ListenAddress: string | null = null;
  ServerCertificate: string | null = null;
  ServerPrivateKey: string | null = null

}

//Enable an HTTP service for Go "pprof"
class ProfileConfig {

  Enabled: boolean = false;
  Address: string = '0.0.0.0:6060';


}
//BCCSP configures the blockchain crypto service providers
class BCCSPConfig {
  Default: string = 'SW';
  SW: object = {
    Hash: 'SHA2',
    Security: 256,
    FileKeyStore: null,
    KeyStore: null
  };

  PKCS11: object = {
    Library: null,
    Label: null,
    Pin: null,
    Hash: null,
    Security: null,
    FileKeyStore: null,
    KeyStore: null
  };

}
//Authentication contains configuration parameters related to authenticating client message
class AuthenticationConfig {
  TimeWindow: string = '15m';
}


//*************************************************
// FileLedger config
// The directory to store the blocks in and prefix
class FileLedgerConfig {
  Location: string = '/var/hyperledger/production/orderer';
  Prefix: string = 'hyperledger-fabric-ordererledger';
}

//*************************************************
// Kafka config
// configuration of the Kafka-based orderer, and its interaction with the Kafka cluster
class KafkaConfig {
  Retry: Object = {
    ShortInterval: '5s',
    ShortTotal: '10m',
    LongInterval: '5m',
    LongTotal: '12h',
    NetworkTimeouts: {
      DialTimeout: '10s',
      ReadTimeout: '10s',
      WriteTimeout: '10s'
    },
    Metadata: {
      RetryBackoff: '250ms',
      RetryMax: 3
    },
    Producer: {
      RetryBackoff: '100ms',
      RetryMax: 3
    },
    Consumer: {
      RetryBackoff: '2s'
    }
  };
  Topic: Object = { ReplicationFactor: 3 };
  Verbose: Boolean = false;
  TLS: Object = {
    Enabled: false,
    PrivateKey: null,
    Certificate: null,
    RootCAs: null
  };
  SASLPlain: Object = {
    Enabled: false,
    User: null,
    Password: null
  };
  Version: number | null = null;

}

//*************************************************
// Debug config
// debugging options for the orderer
class DebugConfig {
  BroadcastTraceDir: number | null = null;
  DeliverTraceDir: string | null = null;

}

//*************************************************
// Operation config
// operations server endpoint for the orderer
class OperationConfig {
  ListenAddress: string = '127.0.0.1:8443';
  TLS: Object = {
    Enabled: false,
    Certificate: null,
    PrivateKey: null,
    ClientAuthRequired: false,
    ClientRootCAs: null
  };
}

//*************************************************
// Metrics config
// metrics collection for the orderer
class MetricsConfig {
  Provider: string = 'disabled'
  Statsd: Object = {
    Network: 'udp',
    Address: '127.0.0.1:8125',
    WriteInterval: '30s',
    Prefix: null
  }
}

//*************************************************
// Consensus config
// config options for a consensus plugin
class ConsensusConfig {
  WALDir: string = '/var/hyperledger/production/orderer/etcdraft/wal';
  SnapDir: string = '/var/hyperledger/production/orderer/etcdraft/snapshot';
}

export default new OrdererConfig();
