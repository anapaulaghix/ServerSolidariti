const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password@123",
  database: "crudsolidariti",
})

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const {name} = req.body;
  const {email} = req.body;
  const {senha} = req.body;

  let SQL = "INSERT INTO doadores (name, email, senha) VALUES (?, ?, ?)";
  db.query(SQL, [name, email, senha], (err, result) => {
    if(err) console.log(err)
    else res.send(result);
  })
})

app.get("/pedido", (req, res) => {
  let SQL = "SELECT * FROM doadores";
  db.query(SQL, (err, result) => {
    if(err) console.log(err)
    else res.send(result)
  })
})

app.delete("/delete/:id", (req,res) => {
  const {id} = req.params;
  let SQL = "DELETE FROM doadores WHERE iddoadores = ?";
  db.query (SQL, [id], (err, result) => {
    if(err) console.log(err)
    else res.send(result);
  })
})

app.listen(3001, () => {
  console.log("rodando server");
})