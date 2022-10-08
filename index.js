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

//Controle de solicitacoes

app.post("/register", (req, res) => {
  const {name} = req.body;
  const {email} = req.body;
  const {senha} = req.body;
  const {quant} = req.body

  let mysql = "INSERT INTO doadores (name, email, senha, quant) VALUES (?, ?, ?, ?)";
  db.query(mysql, [name, email, senha, quant], (err, result) => {
    if(err) console.log(err)
    else res.send(result);
  })
})

app.get("/pedido", (req, res) => {
  let mysql = "SELECT * FROM doadores";
  db.query(mysql, (err, result) => {
    if(err) console.log(err)
    else res.send(result)
  })
})

app.delete("/delete/:id", (req,res) => {
  const {iddoadores} = req.params;
  let mysql = "DELETE FROM doadores WHERE iddoadores = ?";
  db.query (mysql, iddoadores, (err, result) => {
    if(err) console.log(err)
    else res.send(result);
  })
})

//Contribuintes

app.post("/cadastro", (req, res) => {
  const {name} = req.body;
  const {email} = req.body;
  const {cidade} = req.body;
  const {local} = req.body

  let mysql = "INSERT INTO contribuintes (name, email, cidade, local) VALUES (?, ?, ?, ?)";
  db.query(mysql, [name, email, cidade, local], (err, result) => {
    if(err) console.log(err)
    else res.send(result);
  })
})

app.get("/cadastros", (req, res) => {
  let mysql = "SELECT * FROM contribuintes";
  db.query(mysql, (err, result) => {
    if(err) console.log(err)
    else res.send(result)
  })
})

app.listen(3001, () => {
  console.log("rodando server");
})