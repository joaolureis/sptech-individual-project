var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM idUsuario WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT idUsuario, nome, senha, email FROM usuario`;

  return database.executar(instrucaoSql);
}

function buscarPorEmail(email) {
  var instrucaoSql = `SELECT * FROM usuario WHERE email = '${email}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(email, senha) {
  var instrucaoSql = `INSERT INTO usuario (email, senha) VALUES ('${email}', '${senha}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorEmail, buscarPorId, cadastrar, listar };
