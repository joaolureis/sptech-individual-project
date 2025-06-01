var database = require("../database/config");

function buscarMaiorPontuacao(idUsuario) {
    const instrucaoSql = `
SELECT 
    fkQuiz AS Quiz,
    Usuario.nome AS Usuário,
    MAX(pontos) AS Pontuação
FROM Resultado
JOIN Usuario ON Resultado.fkUsuario = ${idUsuario}
GROUP BY fkQuiz, Usuario.nome;`;

    return database.executar(instrucaoSql);
}

function buscarMenorPontuacao(idUsuario) {
    const instrucaoSql = `
SELECT 
    fkQuiz AS Quiz,
    Usuario.nome AS Usuário,
    MIN(pontos) AS Pontuação
FROM Resultado
JOIN Usuario ON Resultado.fkUsuario = ${idUsuario}
GROUP BY fkQuiz, Usuario.nome;`;

    return database.executar(instrucaoSql);
}

function buscarMediaPontuacao() {
    const instrucaoSql = `
    SELECT AVG(pontos) AS 'Média'
    FROM resultado;
    `;
    return database.executar(instrucaoSql);
}

function buscarUsuariosPontuacoes() {
    const instrucaoSql = `
SELECT 
    fkQuiz AS Quiz,
    Usuario.nome AS Usuário,
    pontos AS Pontuação
FROM Resultado
JOIN Usuario ON Resultado.fkUsuario = Usuario.idUsuario;`;

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

module.exports = {
    buscarMaiorPontuacao,
    buscarMenorPontuacao,
    buscarMediaPontuacao,
    buscarUsuariosPontuacoes
}