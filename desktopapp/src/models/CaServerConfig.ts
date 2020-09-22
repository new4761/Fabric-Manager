// version 0.1.0
// Class for create Config.yaml for Ca Sererver Config
import fs from 'fs';
import YAML from 'yaml';
import YamlConfig from './YamlConfig'
class CaServerConfig implements YamlConfig{
   //************************************************* 
   // variables for export file
   fileName:string;
   defaultOutputPath:string; 
   //************************************************
   // self Class variables
   //version :string;
   //port :number;
   // debug:boolean;
   // crlsizelimit:number;
   //****************************************   
   //YamlConfig defalut Function
   constructor(){
    this.fileName ="fabric-ca-server-config.yaml";
    this.defaultOutputPath = "";
   }
   createFile() {
     
   }
   saveFile(){

   }
   editFile(filePath:string,inputFileData:object)  {
     
   }
   updateNetworkConfig(){

   }
   //*********************************************
   // Self function

  
  myReadFile  ()  {
  //console.log(YAML);
  //console.log(fs);

  const file = fs.readFileSync('./src/models/fabric-ca-server-config.yaml', 'utf8');
  console.log(file)
  YAML.parse(file);
  }
  
}

export default new CaServerConfig();
