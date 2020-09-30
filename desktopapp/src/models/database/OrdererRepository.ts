
class OrdererRepository {
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
        CREATE TABLE IF NOT EXISTS Orderer (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          directory TEXT,
          port INTEGER)`;
        return this.dao.run(sql);
    }

    //insert new row
    //input depends on which table or class needed to insert
    create(name: string, directory: string, port: number) {
        return this.dao.run(
            `INSERT INTO Orderer (name, directory, port)
              VALUES (?, ?, ?)`,
            [name, directory, port]) 
    }

    //update row
    //find a coresponding of a given column and replace the value in that row
    //in this case; id
    update(input: { id: number; name: string; directory: string; port:number; }) {
        const { id, name, directory, port } = input
        return this.dao.run(
            "UPDATE Orderer SET name = ?, directory = ?, port =? WHERE id = ?",
            [name, directory, port, id]
        )
    }

    //delete row by given id
    delete(id:number) {
        return this.dao.run(
          `DELETE FROM Orderer WHERE id = ?`,
          [id]
        )
      }
}

module.exports = OrdererRepository;