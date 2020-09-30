
class CARepository {
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
        CREATE TABLE IF NOT EXISTS CA (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          type TEXT,
          directory TEXT,
          port INTEGER)`;
        return this.dao.run(sql);
    }

    //insert new row
    //input depends on which table or class needed to insert
    create(name: string, type: string, directory: string, port: number) {
        return this.dao.run(
            `INSERT INTO CA (name, type, directory, port)
              VALUES (?, ?, ?, ?)`,
            [name, type, directory, port])
    }

    //update row
    //find a coresponding of a given column and replace the value in that row
    //in this case; id  
    update(input: { id: number; name: string; type: string; directory: string; port:number; }) {
        const { id, name, type, directory, port } = input
        return this.dao.run(
            "UPDATE CA SET name = ?, directory = ?, type =?, port =? WHERE id = ?",
            [name, directory, type, port, id]
        )
    }

    //delete row by given id
    delete(id:number) {
        return this.dao.run(
          `DELETE FROM CA WHERE id = ?`,
          [id]
        )
      }
}

module.exports = CARepository;