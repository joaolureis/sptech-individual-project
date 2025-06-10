var database = require("../database/config");

// Seleciona 10 perguntas aleatórias da tabela Pergunta e traz, junto com cada uma delas, todas as alternativas relacionadas, a partir da tabela alternativa.
function buscarPerguntas(){
    const instrucaoSql = `
    SELECT p.idPergunta,
    p.descricao as Pergunta,
    a.idAlternativa,
    a.fkPergunta,
    a.resposta,
    a.correta
	FROM ( SELECT idPergunta, descricao
    FROM Pergunta ORDER BY RAND()
    LIMIT 10
    ) as p
    JOIN alternativa a
    ON a.fkPergunta = p.idPergunta;`

    console.log("Executando a Instrução Sql: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrarPontos(idUsuario, fkQuiz, pontos){
    const instrucao = `
    INSERT INTO resultado (fkUsuario, fkQuiz, pontos) VALUES
    ('${idUsuario}','${fkQuiz}', '${pontos}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarPerguntas,
    cadastrarPontos
};