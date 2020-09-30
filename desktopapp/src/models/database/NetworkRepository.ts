class NetworkRepository {
  //use dao to handle any sql tasks
    dao: any;
    constructor(dao: any) {
        this.dao = dao;
    }

    //create table
    //if table already exist; do nothing
    createTable() {
        console.log('createTable');
        const sql = `
        CREATE TABLE IF NOT EXISTS NetworkConfig (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          directory TEXT)`;
        return this.dao.run(sql);
    }

    //insert new row
    //input depends on which table or class needed to insert
    create(name: string, directory: string) {
        return this.dao.run(
            `INSERT INTO NetworkConfig (name, directory)
              VALUES (?, ?)`,
            [name, directory])
        
    }

    //update row
    //find a coresponding of a given column and replace the value in that row
    //in this case; id
    update(project: { id: number; name: string; directory: string; }) {
        const { id, name, directory } = project
        return this.dao.run(
            "UPDATE NetworkConfig SET name = ?, directory = ? WHERE id = ?",
            [name, directory, id]
        )
    }

    //delete row by given id
    delete(id:number) {
        return this.dao.run(
          `DELETE FROM NetworkConfig WHERE id = ?`,
          [id]
        )
      }
}

module.exports = NetworkRepository;