var database = require("../database/config");

function buscarMaiorPontuacao(idUsuario) {
    const instrucaoSql = `
SELECT 
    fkQuiz AS Quiz,
    Usuario.nome AS Usuário,
    MAX(pontos) AS Pontuacao_Maxima
FROM resultado
JOIN Usuario ON resultado.fkUsuario = ${idUsuario}
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
FROM resultado
JOIN Usuario ON resultado.fkUsuario = ${idUsuario}
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
FROM resultado r
JOIN Usuario u ON r.fkUsuario = u.idUsuario
JOIN (
    SELECT fkUsuario, MAX(idResultado) AS idMax
    FROM resultado
    WHERE (fkUsuario, pontos) IN (
        SELECT fkUsuario, MAX(pontos)
        FROM resultado
        GROUP BY fkUsuario
    )
    GROUP BY fkUsuario
) AS melhores ON r.idResultado = melhores.idMax
ORDER BY r.pontos DESC
LIMIT 10;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ParticipacaodosUsuarios() {
    const instrucaoSql = `
    SELECT 
        COUNT(r.fkUsuario) AS Realizados,
        COUNT(u.idUsuario) - COUNT(r.fkUsuario) AS "Não Realizados"
    FROM Usuario u
        LEFT JOIN (SELECT DISTINCT fkUsuario FROM resultado) r ON u.idUsuario = r.fkUsuario;`

    return database.executar(instrucaoSql);

}


module.exports = {
    buscarMaiorPontuacao,
    buscarMenorPontuacao,
    buscarMediaPontuacao,
    buscarUsuariosPontuacoes,
    ParticipacaodosUsuarios
}