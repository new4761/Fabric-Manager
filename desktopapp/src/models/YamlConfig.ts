//version 0.1.0  
// interface for make all config.yaml file in hyperledger 


interface YamlConfig {

  // file name for output file name eaxmple xxx.yaml
  // define is on constructor
  fileName:string;
  // make all yaml process in this function and call save() 
  // parameter is object of data file
  createFile:(dataFile: object) =>void;
  // save function to config dir  
  saveFile:() => void;
  // edit file  for make new config
  // parameter string = url+filename to edit , object = new input to config
  editFile:(filePath: string,dataFile: object) => void;
  //update networkConfig pass NewData to main project config
  //don't do anything on this function right now we will deal with it later
  updateNetworkConfig:() => void ;


}
export default YamlConfig; 
