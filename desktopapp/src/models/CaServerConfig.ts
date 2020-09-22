import fs from 'fs';
import YAML from 'yaml';
class CaServerConfig {
//  version : string
//  port : number 
//  cors : {
//       enabled : boolean
//       origins : Array<string>
//  }
//  debug: boolean
//  crlsizelimit : number
//  tls:{
//     enabled:boolean
//     certfile:string
//     clientauth: {
//     type: string
//
//    }
//  }
  
  myReadFile  ()  {
  //console.log(YAML);
  //console.log(fs);

  const file = fs.readFileSync('./src/models/fabric-ca-server-config.yaml', 'utf8');
  console.log(file);
  YAML.parse(file);
  }
  
}

export default new CaServerConfig();
