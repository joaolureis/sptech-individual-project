var database = require("../database/config");

function buscarMaiorPontuacao(idUsuario) {
    const instrucaoSql = `
SELECT 
    fkQuiz AS Quiz,
    Usuario.nome AS Usuário,
    MAX(pontos) AS Pontuacao_Maxima
FROM Resultado
JOIN Usuario ON Resultado.fkUsuario = ${idUsuario}
GROUP BY fkQuiz, Usuario.nome
Limit 1;`;

    return database.executar(instrucaoSql);
}

function buscarMenorPontuacao(idUsuario) {
    const instrucaoSql = `
SELECT 
    fkQuiz AS Quiz,
    Usuario.nome AS Usuário,
    MIN(pontos) AS pontuacao_minima
FROM Resultado
JOIN Usuario ON Resultado.fkUsuario = ${idUsuario}
GROUP BY fkQuiz, Usuario.nome
Limit 1;`;

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
    r.fkQuiz AS Quiz,
    u.nome AS Usuário,
    r.pontos AS Pontuação
FROM Resultado r
JOIN Usuario u ON r.fkUsuario = u.idUsuario
JOIN (
    SELECT fkUsuario, MAX(idResultado) AS idMax
    FROM Resultado
    WHERE (fkUsuario, pontos) IN (
        SELECT fkUsuario, MAX(pontos)
        FROM Resultado
        GROUP BY fkUsuario
    )
    GROUP BY fkUsuario
) AS melhores ON r.idResultado = melhores.idMax
ORDER BY r.pontos DESC
LIMIT 10;`;

console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}

function distribuicaoPorDesempenho(){
    const instrucaoSql = `SELECT 
  CASE 
    WHEN pontos >= 9 THEN 'Excelente'
    WHEN pontos >= 7 THEN 'Bom'
    WHEN pontos >= 5 THEN 'Regular'
    ELSE 'Ruim'
  END AS desempenho,
  COUNT(*) AS quantidade
FROM Resultado
GROUP BY desempenho
ORDER BY 
  CASE 
    WHEN desempenho = 'Excelente' THEN 1
    WHEN desempenho = 'Bom' THEN 2
    WHEN desempenho = 'Regular' THEN 3
    ELSE 4
  END;`

  return database.executar(instrucaoSql);
  
}


module.exports = {
    buscarMaiorPontuacao,
    buscarMenorPontuacao,
    buscarMediaPontuacao,
    buscarUsuariosPontuacoes,
    distribuicaoPorDesempenho
}