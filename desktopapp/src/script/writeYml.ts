var app = window.require('electron').remote;
const fs = app.require('fs');
const yaml = require('js-yaml');
import Uinput from '../../output/user-input.json';

interface ordererYml {
    General: {
      ListenAddress: string,
      ListenPort: number,
      TLS: {
        Enabled: boolean,
        PrivateKey: string,
        Certificate: number,
        RootCAs: Array<string>,
        ClientAuthRequired: boolean,
        ClientRootCAs: number|null
      },
      Keepalive: {
        ServerMinInterval:string,
        ServerInterval: string,
        ServerTimeout: string
      },
      Cluster: {
        SendBufferSize: number,
        ClientCertificate: string|null,
        ClientPrivateKey: string|null,
        ListenPort: string|null,
        ListenAddress: string|null,
        ServerCertificate: string|null,
        ServerPrivateKey: string|null
      },
      BootstrapMethod: string,
      BootstrapFile: string|null,
      LocalMSPDir: string,
      LocalMSPID: string,
      Profile: { 
        Enabled: boolean, 
        Address: string 
      },
      BCCSP: {
        Default: string,
        SW: {
          Hash: string,
          Security: number,
          FileKeyStore: string|null,
          KeyStore: string|null
        }, 
        PKCS11: {
          Library: string|null,
          Label: string|null,
          Pin: string|null,
          Hash: string|null,
          Security: string|null,
          FileKeyStore: string|null,
          KeyStore: string|null
        }
      },
      Authentication: { TimeWindow: string }
    },
    FileLedger: {
      Location: string,
      Prefix: string
    },
    Kafka: {
      Retry: {
        ShortInterval: string,
        ShortTotal: string,
        LongInterval: string,
        LongTotal: string,
        NetworkTimeouts: {
          DialTimeout: string,
          ReadTimeout: string,
          WriteTimeout: string
        },
        Metadata:  {
          RetryBackoff: string,
          RetryMax: number
        },
        Producer: {
          RetryBackoff: string,
          RetryMax: number
        },
        Consumer: {
          RetryBackoff: string
        }
      },
      Topic: { ReplicationFactor: number },
      Verbose: boolean,
      TLS: {
        Enabled: boolean,
        PrivateKey: string|null,
        Certificate: string|null,
        RootCAs: string|null
      },
      SASLPlain: { Enabled: boolean, User: string|null, Password: string|null },
      Version: number|null
    },
    Debug: { BroadcastTraceDir: string|null, DeliverTraceDir: string|null },
    Operations: {
      ListenAddress: string,
      TLS: {
        Enabled: boolean,
        Certificate: string|null,
        PrivateKey: string|null,
        ClientAuthRequired: boolean|null,
        ClientRootCAs: string|null
      }
    },
    Metrics: {
      Provider: string,
      Statsd: {
        Network: string,
        Address: string,
        WriteInterval: string,
        Prefix: string|null
      }
    },
    Consensus: {
      WALDir: string,
      SnapDir: string
    }
  
}

 function writeYml (): void {

      var port:number = Uinput.port;
      var Certificate:number  = Uinput.Certificate;

     let ConfigedYml :ordererYml = {
        General: {
          ListenAddress: '127.0.0.1',
          ListenPort: port,
          TLS: {
            Enabled: false,
            PrivateKey: 'tls/server.key',
            Certificate: Certificate,
            RootCAs: ['tls/ca.crt'],
            ClientAuthRequired: false,
            ClientRootCAs: null
          },
          Keepalive: {
            ServerMinInterval: '60s',
            ServerInterval: '7200s',
            ServerTimeout: '20s'
          },
          Cluster: {
            SendBufferSize: 10,
            ClientCertificate: null,
            ClientPrivateKey: null,
            ListenPort: null,
            ListenAddress: null,
            ServerCertificate: null,
            ServerPrivateKey: null
          },
          BootstrapMethod: 'file',
          BootstrapFile: null,
          LocalMSPDir: 'msp',
          LocalMSPID: 'SampleOrg',
          Profile: { 
            Enabled: false, 
            Address: '0.0.0.0:6060' 
          },
          BCCSP: {
            Default: 'SW',
            SW: {
              Hash: 'SHA2',
              Security: 256,
              FileKeyStore: null,
              KeyStore: null
            }, 
            PKCS11: {
              Library: null,
              Label: null,
              Pin: null,
              Hash: null,
              Security: null,
              FileKeyStore: null,
              KeyStore: null
            }
          },
          Authentication: { TimeWindow: '15m' }
        },
        FileLedger: {
          Location: '/var/hyperledger/production/orderer',
          Prefix: 'hyperledger-fabric-ordererledger'
        },
        Kafka: {
          Retry: {
            ShortInterval: '5s',
            ShortTotal: '10m',
            LongInterval: '5m',
            LongTotal: '12h',
            NetworkTimeouts: {
              DialTimeout: '10s',
              ReadTimeout: '10s',
              WriteTimeout: '10s'
            },
            Metadata:  {
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
          },
          Topic: { ReplicationFactor: 3 },
          Verbose: false,
          TLS: {
            Enabled: false,
            PrivateKey: null,
            Certificate: null,
            RootCAs: null
          },
          SASLPlain: { Enabled: false, User: null, Password: null },
          Version: null
        },
        Debug: { BroadcastTraceDir: null, DeliverTraceDir: null },
        Operations: {
          ListenAddress: '127.0.0.1:8443',
          TLS: {
            Enabled: false,
            Certificate: null,
            PrivateKey: null,
            ClientAuthRequired: false,
            ClientRootCAs: null
          }
        },
        Metrics: {
          Provider: 'disabled',
          Statsd: {
            Network: 'udp',
            Address: '127.0.0.1:8125',
            WriteInterval: '30s',
            Prefix: null
          }
        },
        Consensus: {
          WALDir: '/var/hyperledger/production/orderer/etcdraft/wal',
          SnapDir: '/var/hyperledger/production/orderer/etcdraft/snapshot'
        }
      }

     let yamlStr = yaml.safeDump(ConfigedYml);
     fs.writeFileSync('./output/data-out.yaml', yamlStr, 'utf8');
    }

export default writeYml
