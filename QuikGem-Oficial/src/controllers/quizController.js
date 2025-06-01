var quizModel = require("../models/quizModel");

function buscarPerguntas(req, res) {
    quizModel.buscarPerguntas()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("erro ao buscar perguntas:", erro)
            res.status(500).json({ erro: "erro ao buscar perguntas" })
        });
}

function cadastrarPontos(req, res) {
    const { idUsuario, fkQuiz, pontos } = req.body;

    quizModel.cadastrarPontos(idUsuario, fkQuiz, pontos)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao cadastrar pontuação" })
        });
}

module.exports = {
    buscarPerguntas,
    cadastrarPontos
};