
import fs from 'fs';
// check is  isDevelopment?
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path');
export class FileJsonBuilder {


   saveFile(outputPath: string, inputFileData: string, fileName: string) {

      try {
         // check dev mode function
         // used this style for base to write function who work with files
         if (isDevelopment) {
            console.log(path.dirname(__dirname));
         }
         let filePath = path.join(!isDevelopment ? path.join(path.dirname(__dirname), outputPath) : 'tests', fileName);
         fs.writeFileSync(filePath, inputFileData, 'utf-8');
      }
      catch (e) {
         console.log(e);
      }
   }
   saveFileWithReplace(outputPath: string, inputFileData: string, fileName: string, target: RegExp, text: string) {
      try {
         // check dev mode function
         // used this style for base to write function who work with files
         if (isDevelopment) {
            console.log(path.dirname(__dirname));
         }
         let filePath = path.join(!isDevelopment ? path.join(path.dirname(__dirname), outputPath) : 'tests', fileName);
         fs.writeFileSync(filePath, inputFileData, 'utf-8');
         let data = fs.readFileSync(filePath,'utf-8')
         var newValue = data.replace(target,text)
         fs.writeFileSync(filePath, newValue, 'utf-8')          
                 }
      catch (e) {
         console.log(e);
      }
   }
}
