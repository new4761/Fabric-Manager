
class OrdererRepository {
    dao: any;

    constructor(dao: any) {
        this.dao = dao;
    }

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

    create(name: string, directory: string, port: number) {
        return this.dao.run(
            `INSERT INTO Orderer (name, directory, port)
              VALUES (?, ?, ?)`,
            [name, directory, port]) 
    }

    update(input: { id: number; name: string; directory: string; port:number; }) {
        const { id, name, directory, port } = input
        return this.dao.run(
            "UPDATE Orderer SET name = ?, directory = ?, port =? WHERE id = ?",
            [name, directory, port, id]
        )
    }

    delete(id:number) {
        return this.dao.run(
          `DELETE FROM Orderer WHERE id = ?`,
          [id]
        )
      }
}

module.exports = OrdererRepository;