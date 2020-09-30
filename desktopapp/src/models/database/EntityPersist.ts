const path = require('path');
const Database = require('better-sqlite3');
// check is  isDevelopment?
const isDevelopment = process.env.NODE_ENV !== 'production'

class EntityPersist {

  //default path of database
  defaultOutputPath: string;
  db: any;

  //connecting to database
  constructor() {
    this.defaultOutputPath = "./tests";
    let filePath = path.join(!isDevelopment ? path.dirname(__dirname) : '', this.defaultOutputPath, 'Network.db');
    this.db = new Database(filePath, { verbose: console.log });
  }

  //execute a given sql command and parameters
  //use prepare to handle sql and run to handle any params
  run(sql: string, params = []) {
    const stmt = this.db.prepare(sql, function (err:any) {
      //checking error (not working atm)
      if (err) {
        console.log('Error running sql ' + 'sql')
      }
      else {
        console.log('Success running sql ' + 'sql')
      }
    })
    const info = stmt.run(params);
    console.log(info.changes);
  }

  //get a row from table
  get(sql: string, params = []) {
    const stmt = this.db.get(sql, function (err:any){})
  }

  //get all data from table
  all(sql: string, params = []) {
    const stmt = this.db.all(sql, function (err:any){})
  }

}

module.exports = EntityPersist;