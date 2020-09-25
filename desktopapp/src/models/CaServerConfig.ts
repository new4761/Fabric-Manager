// Class for create Config.yaml for Ca Sererver Config
// type of ca = root TLS | CA / intermediate CA
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
   version : string = "1.4.7" ;
   port:number = 7052;
   debug:boolean = true;
   crlsizelimit:number = 512000;
   crl={
      expiry:"24h"
      };
   csr:CrossOriginConfig = new CrossOriginConfig();
   tls:TlsSettingConfig = new TlsSettingConfig();
   // ****************************************   
   //YamlConfig defalut Function
   constructor(){
    this.fileName ="fabric-ca-server-config.yaml";
    this.defaultOutputPath = "";
   }
   getUserInput(userInput:CaServerConfig){
      console.log(userInput);
   }
   createFile() {
     
   }
   saveFile(outputPath = this.defaultOutputPath){

   }

   editFile(filePath:string,inputFileData:object)  {
     
   }
   updateNetworkConfig(){

   }
   // *********************************************
   // Self function

  
  myReadFile  ()  {
  //console.log(fs);

   //const file = fs.readFileSync('./src/models/fabric-ca-server-config.yaml', 'utf8');
   let src =YAML.stringify(new CaServerConfig());
   src += "## this is test comment";

   fs.writeFileSync('newfile.yaml',src,'utf-8');

  
   }
}
class CrossOriginConfig {
  enable:boolean = true;
  origins: Array<string> = ["*"]
}
class TlsSettingConfig {
 enable:boolean = false;
 //if root TLS ca should blank
 certfile:string = "ca-cert.pem";
 keyfile:string ="ca-key.pem";
 clientauth = {      
    type : "noclientcert",
    certfiles : {}
 };
}
class CertificatesConfig {
   name:string ;
   keyfile:string = "ca-key.pem";
   certfile:string = "ca-cert.pem";
   chainfile:string = "ca-chain.pem";
   constructor(org_name:string){
   this.name = org_name;
   }
}
class RegistryConfig {
  maxenrollments :number = -1 ;
  identities:Identities[]=[];    
}

interface  Attrs{
       hf_Registrar_Roles: string,
       hf_Registrar_DelegateRoles: string,
       hf_Revoker: boolean,
       hf_IntermediateCA: boolean,
       hf_GenCRL: boolean,
       hf_Registrar_Attributes: string,
       hf_AffiliationMgr: boolean
   }
 
class Identities {
   name:string;
   pass:string;
   type:string;
   affiliation:string="";
   attrs:Attrs;
   constructor(name:string,pass:string,type:string,attrs:Attrs){ 
      this.name = name;
      this.pass = pass;
      this.type = type;
      this.attrs = attrs;
      }
}
class DatabasConfig {
   type:string="sqlite3" // mysql || postgesql wait enum
   datasource:string ="fabric-ca-server.db"
   tls= {
       enabled:false,
       certfiles:["db-server-cert.pem"],
       client:{
       certfile:"db-client-cert.pem",
       keyfile: "db-client-key.pem"
       }

   }
}


export default new CaServerConfig();
