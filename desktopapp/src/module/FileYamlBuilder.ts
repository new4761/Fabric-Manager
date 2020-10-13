
import fs from 'fs';
//import YAML from 'yaml';
// check is  isDevelopment?
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path');
export class FileYamlBuilder {
    saveFile(outputPath:string, inputFileData: string,fileName:string) {
       console.log(inputFileData)
      try {
         // check dev mode function
         // used this style for base to write function who work with files
         if (!isDevelopment) {
            console.log(path.dirname(__dirname));
         }
         let filePath = path.join(!isDevelopment ? path.join(path.dirname(__dirname),outputPath) :'tests', fileName);
         fs.writeFileSync(filePath, inputFileData, 'utf-8');
      }
      catch (e) {
         console.log(e);
      }
   }
}