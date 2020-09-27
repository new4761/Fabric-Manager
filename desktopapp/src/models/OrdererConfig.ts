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
  //************************************************
  // Class variables


  General: GeneralConfig = new GeneralConfig();
  FileLedger: FileLedgerConfig = new FileLedgerConfig();
  Kafka: KafkaConfig = new KafkaConfig();
  Debug:DebugConfig = new DebugConfig();
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
 createFile() {

  console.log("creatingFile");

  //### obsolete ###
  // this.ymlString += yaml.safeDump(new GeneralConfig());
  // this.ymlString += yaml.safeDump(new FileLedgerConfig());
  // this.ymlString += yaml.safeDump(new KafkaConfig());
  // this.ymlString += yaml.safeDump(new DebugConfig());
  // this.ymlString += yaml.safeDump(new OperationConfig());
  // this.ymlString += yaml.safeDump(new MetricsConfig());
  // this.ymlString += yaml.safeDump(new ConsensusConfig());
  //###############


    let ymlString = yaml.safeDump(new OrdererConfig());
    fs.writeFileSync('newfile.yaml', ymlString, 'utf-8');
    return ymlString;
 }


 saveFile(outputPath = this.defaultOutputPath, inputFileData: string) {
  console.log("savingFile");
  console.log(outputPath);
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

}

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


class TLSConfig {
      Enabled:boolean = false;
            PrivateKey:string = 'tls/server.key';
            Certificate:string = 'tls/ca.crt';
            RootCAs:Array<string> = ['tls/ca.crt'];
            ClientAuthRequired:boolean = false;
            ClientRootCAs: number|null = null

}

class KeepaliveConfig {
  ServerMinInterval:string = '60s';
  ServerInterval:string = '7200s';
  ServerTimeout:string = '20s'
}

class ClusterConfig {
  SendBufferSize:number = 10;
  ClientCertificate:string|null = null;
  ClientPrivateKey:string|null = null;
  ListenPort:string|null = null;
  ListenAddress:string|null = null;
  ServerCertificate:string|null = null;
  ServerPrivateKey:string|null = null

}

class ProfileConfig {
  Enabled:boolean = false;
  Address:string = '0.0.0.0:6060';

}

class BCCSPConfig {
  Default:string = 'SW';
  SW:object = {
    Hash: 'SHA2',
    Security: 256,
    FileKeyStore: null,
    KeyStore: null
  };
  PKCS11:object = {
    Library: null,
    Label: null,
    Pin: null,
    Hash: null,
    Security: null,
    FileKeyStore: null,
    KeyStore: null
  };

}

class AuthenticationConfig {
  TimeWindow:string = '15m';
}

class FileLedgerConfig {
  Location: string = '/var/hyperledger/production/orderer';
  Prefix: string = 'hyperledger-fabric-ordererledger';
}

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

class DebugConfig {
  BroadcastTraceDir: number | null  = null;
  DeliverTraceDir: string | null = null;

}

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

class MetricsConfig {
  Provider: string = 'disabled'
  Statsd: Object = {
    Network: 'udp',
    Address: '127.0.0.1:8125',
    WriteInterval: '30s',
    Prefix: null
  }
}

class ConsensusConfig {
  WALDir: string = '/var/hyperledger/production/orderer/etcdraft/wal';
  SnapDir: string = '/var/hyperledger/production/orderer/etcdraft/snapshot';
}

export default new OrdererConfig();
