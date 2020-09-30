const path = require('path');
const Database = require('better-sqlite3');
// check is  isDevelopment?
const isDevelopment = process.env.NODE_ENV !== 'production'

class EntityPersist {

  defaultOutputPath: string;
  db: any;

  constructor() {
    this.defaultOutputPath = "./tests";
    let filePath = path.join(!isDevelopment ? path.dirname(__dirname) : '', this.defaultOutputPath, 'Network.db');
    this.db = new Database(filePath, { verbose: console.log });
  }

  run(sql: string, params = []) {
    const stmt = this.db.prepare(sql, function (err:any) {

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

  get(sql: string, params = []) {
    const stmt = this.db.get(sql, function (err:any){})
  }

  all(sql: string, params = []) {
    const stmt = this.db.all(sql, function (err:any){})
  }

}

module.exports = EntityPersist;