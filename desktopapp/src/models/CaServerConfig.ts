import fs from 'fs';
import YAML from 'yaml';
import YamlConfig from './YamlConfig'
class CaServerConfig implements YamlConfig{
   fileName:string;
   defaultOutputPath:string; 
   constructor(){
     this.fileName ="fabric-ca-server-config.yaml";
   }

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
  console.log(file)
  YAML.parse(file);
  }
  
}

export default new CaServerConfig();
