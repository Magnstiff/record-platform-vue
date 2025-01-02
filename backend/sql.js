import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xxx",
  database: "xxx",
});

connection.connect();

function queryExe(query, thenfunc) {
  connection.query(
    query,
    thenfunc ||
      function (error, results) {
        if (error) throw error;
        return results;
      },
  );
}

export { queryExe };
