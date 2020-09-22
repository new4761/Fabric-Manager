//version 0.1.7  
// interface for make all config.yaml file in hyperledger 


interface YamlConfig {

  // file name for output file name eaxmple xxx.yaml
  // define is on constructor
  fileName:string;
  // default output path 
  defaultOutputPath:string
  // afther this write self class vairables
 


  // make all yaml process in this function and call save() (not call here we will call on 
  // user process) 
  createFile:() =>void;
  // save function to config dir  with input pa
  // use default parameter trick
  // if Config need to realative path use this
  saveFile:(outputPath = this.defaultOutputPath ) => void;
  // edit file  for make new config
  // parameter string = url+filename to edit , object = new input to config
  editFile:(filePath: string,inputFileData: object) => void;
  //update networkConfig pass NewData to main project config
  //don't do anything on this function right now we will deal with it later
  updateNetworkConfig:() => void ;


}
export default YamlConfig; 
