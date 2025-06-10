const StartQuiz = document.querySelector(".start-quiz")
const proximaQuestao = document.querySelector(".next-question")
const questaoContainer = document.querySelector(".questions-container")
const questao = document.querySelector(".question")
const resultado = document.querySelector(".answers-container")
const resposta = document.querySelectorAll(".answer")

let questaoAtual = 0
let pontos = 0
let idUsuario = sessionStorage.ID_USUARIO;

StartQuiz.addEventListener("click", startGame)
proximaQuestao.addEventListener("click", displayNextQuestion)

//Verificação da Sessão
if (!sessionStorage.ID_USUARIO) {
  console.error("ID de usuário não encontrado na sessão. Redirecionando para login...");
  window.location.href = "/login.html";
} else {
  console.log("Usuário logado. ID:", sessionStorage.ID_USUARIO);
}


// Esconde o botão de iniciar.
// Mostra o container das perguntas.
// Mostra a primeira pergunta.
function startGame() {
  StartQuiz.classList.add("hide")
  questaoContainer.classList.remove("hide")
  displayNextQuestion()
}

function sortearAlternativas(alternativas) {
  for (var i = alternativas.length - 1; i > 0; i--) {
    const sortear = Math.floor(Math.random() * (i + 1));
    [alternativas[i], alternativas[sortear]] = [alternativas[sortear], alternativas[i]];
  }
  return alternativas;
}

function displayNextQuestion() {

  if (questions.length === questaoAtual) {
    return finishGame()
  }

  questions[questaoAtual].respostas = sortearAlternativas(questions[questaoAtual].respostas);


  resultado.innerHTML = "";
  questao.textContent = questions[questaoAtual].Pergunta

  questions[questaoAtual].respostas.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text

    if (answer.correct) {
      newAsnwer.dataset.correct = true
    }
    resultado.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
    proximaQuestao.classList.add("hide")
  })
}


// VERIFICAÇÃO DA RESPOSTA
// CONTABILIZA A PONTUAÇÃO

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    pontos++
  }
  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })

  proximaQuestao.classList.remove("hide")
  questaoAtual++
}

function finishGame() {
  const totalQuestions = questions.length
  proximaQuestao.classList.add("hide")
  const performance = Math.floor(pontos * 100 / totalQuestions)
  resultado.innerHTML = "";

  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  questao.innerHTML =
    `
    <p class="final-message">
      Você acertou ${pontos} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
  enviarPontuacao(sessionStorage.ID_USUARIO, 1);
}

function enviarPontuacao(idUsuario, fkQuiz) {
  fetch("/quiz/cadastrarPontos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pontos: pontos,
      idUsuario: idUsuario,
      fkQuiz: fkQuiz
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao enviar pontuação.")
      return res.json()
    })
    .then(data => {
      console.log("Pontuação cadastrada com sucesso:", data);
    })
    .catch(err => {
      console.error("Erro ao enviar pontuação:", err);
    });
}


var questions = [];

window.onload = () => {
  fetch(`/quiz/Perguntas/`)
    .then(res => res.json())
    .then(data => {
      const perguntasAgrupadas = {}

      data.forEach(item => {
        if (!perguntasAgrupadas[item.idPergunta]) {
          perguntasAgrupadas[item.idPergunta] = {
            Pergunta: item.Pergunta,
            respostas: []
          }
        }

        perguntasAgrupadas[item.idPergunta].respostas.push({
          text: item.resposta,
          correct: item.correta == 1
        })
      })

      questions = Object.values(perguntasAgrupadas) // Salva tudo no array questions.
    })
    .catch(err => console.error("Erro ao carregar perguntas:", err))
}
console.log("ID do usuário:", sessionStorage.ID_USUARIO);
