class NetworkRepository {
    dao: any;

    constructor(dao: any) {
        this.dao = dao;
    }

    createTable() {
        console.log('createTable');
        const sql = `
        CREATE TABLE IF NOT EXISTS NetworkConfig (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          directory TEXT)`;
        return this.dao.run(sql);
    }

    create(name: string, directory: string) {
        return this.dao.run(
            `INSERT INTO NetworkConfig (name, directory)
              VALUES (?, ?)`,
            [name, directory])
        
    }

    update(project: { id: number; name: string; directory: string; }) {
        const { id, name, directory } = project
        return this.dao.run(
            "UPDATE NetworkConfig SET name = ?, directory = ? WHERE id = ?",
            [name, directory, id]
        )
    }

    delete(id:number) {
        return this.dao.run(
          `DELETE FROM tasks WHERE id = ?`,
          [id]
        )
      }
}

module.exports = NetworkRepository;