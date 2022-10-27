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
  const {produtos} = req.body;
  const {doador} = req.body;
  const {categoria} = req.body;
  const {quant} = req.body
  const {data_} = req.body

  let mysql = "INSERT INTO doadores (produtos, doador, categoria, quant, data_) VALUES (?, ?, ?, ?, ?)";
  db.query(mysql, [produtos, doador, categoria, quant, data_], (err, result) => {
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

app.put("/edit", (req, res) => {
   const {id} = req.body
   const {produtos} = req.body;
  const {doador} = req.body;
  const {categoria} = req.body;
  const {quant} = req.body
  const {data_} = req.body

   let mysql = "UPDATE doadores SET produtos = ? AND doador = ? AND categoria = ? AND quant = ? AND data_ = ? WHERE iddoadores = ? "
   db.query(mysql, [id, produtos, doador, categoria, quant, data_], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

app.post("/search", (req, res) => {
  const {produtos} = req.body;
  const {doador} = req.body;
  const {categoria} = req.body;
  const {quant} = req.body
  const {data_} = req.body

  let mysql =
    "SELECT * from doadores WHERE produtos = ? AND doador = ? AND categoria = ? AND quant = ? AND data_ = ?";
  db.query(mysql, [produtos, doador, categoria, quant, data_], (err, result) => {
    if (err) res.send(err);
    res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM doadores WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

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