-- DROP TABLE Usuario;
-- DROP TABLE Resultado;
-- DROP TABLE Quiz;
-- DROP TABLE respostahist;
-- DROP TABLE Pergunta;
-- DROP TABLE alternativa;

CREATE DATABASE steven;
USE steven;

CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY auto_increment,
nome VARCHAR(80) NOT NULL,
senha VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL
);

CREATE TABLE Quiz(
idQuiz INT PRIMARY KEY auto_increment,
descricao VARCHAR(100)
);

CREATE TABLE resultado(
idResultado INT PRIMARY KEY auto_increment,
fkQuiz INT,
fkUsuario INT,
dtResultado DATE,
pontos INT NOT NULL,
	CONSTRAINT fkResultadoQuiz FOREIGN KEY (fkQuiz) REFERENCES Quiz(idQuiz),
    CONSTRAINT fkResultadoUsuario FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario) 
);

CREATE TABLE Pergunta(
idPergunta INT PRIMARY KEY auto_increment,
descricao VARCHAR(100),
fkQuiz INT,
CONSTRAINT fkPerguntaQuiz FOREIGN KEY (fkQuiz) REFERENCES Quiz(idQuiz)
);

CREATE TABLE alternativa(
idAlternativa INT PRIMARY KEY auto_increment,
fkPergunta INT,
letra CHAR(1) NOT NULL,
resposta VARCHAR(100),
correta TINYINT NOT NULL,
	CONSTRAINT fkAlternativaPergunta FOREIGN KEY (fkPergunta) REFERENCES Pergunta(idPergunta)
); 

CREATE TABLE respostahist(
idRespostahist INT PRIMARY KEY auto_increment,
fkAlternativa INT,
fkResultado INT,
		CONSTRAINT fkRespostaAlternativa FOREIGN KEY (fkAlternativa) REFERENCES Alternativa(idAlternativa),
		CONSTRAINT fkRespostaResultado FOREIGN KEY (fkResultado) REFERENCES Resultado(idResultado)
);

INSERT INTO Usuario VALUES 
(default, 'João Lucas','123456*','joao.lcarvalho@sptech.school'),
(default, 'Maria Eduarda','1598532&','maria@sptech.school'),
(default, 'Regiane','147258//','regiane@sptech.school'),
(default, 'Rodrigo','sptech123@','rodrigo@sptech.school');

INSERT INTO Quiz VALUES
(default, 'Steven Universe - Quiz');

INSERT INTO Resultado VALUES
(default, 1, 1,'2025-05-16', 10),
(default, 1 , 2,'2025-05-15', 9),
(default, 1, 3,'2025-05-14', 8.5),
(default, 1, 4,'2025-05-13', 8);

INSERT INTO Pergunta VALUES
(default, ' Qual é a fusão entre Ruby e Sapphire?', 1),
(default, 'Qual o instrumento musical que Steven costuma tocar?', 1),
(default, 'Qual das Gems é a líder das Crystal Gems?', 1),
(default, 'Qual o nome da cidade onde Steven mora?', 1),
(default, 'Qual é a identidade original da mãe de Steven?', 1),
(default, 'Qual personagem humano é amigo próximo de Steven e trabalha com rosquinhas?', 1),
(default, 'O que acontece com a gema de Steven ao final da série Steven Universe Future?', 1),
(default, 'Quem é a melhor amiga humana de Steven e também treina espada com Pearl?', 1),
(default, 'Qual fusão representa a união de Garnet, Amethyst e Pearl?', 1),
(default, 'O que acontece quando duas Gems se fundem?', 1);

-- Pergunta 1: Qual é a fusão entre Ruby e Sapphire?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(1, 'A', 'Opal', 0),
(1, 'B', 'Garnet', 1),
(1, 'C', 'Sardonyx', 0),
(1, 'D', 'Stevonnie', 0);

-- Pergunta 2: Qual o instrumento musical que Steven costuma tocar?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(2, 'A', 'Violão', 0),
(2, 'B', 'Bateria', 0),
(2, 'C', 'Ukulele', 1),
(2, 'D', 'Piano', 0);

-- Pergunta 3: Qual das Gems é a líder das Crystal Gems?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(3, 'A', 'Pearl', 0),
(3, 'B', 'Amethyst', 0),
(3, 'C', 'Rose Quartz', 0),
(3, 'D', 'Garnet', 1);

-- Pergunta 4: Qual o nome da cidade onde Steven mora?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(4, 'A', 'Beach City', 1),
(4, 'B', 'Crystal Town', 0),
(4, 'C', 'Gem Valley', 0),
(4, 'D', 'Ocean View', 0);

-- Pergunta 5: Qual é a identidade original da mãe de Steven?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(5, 'A', 'Pink Diamond', 1),
(5, 'B', 'Blue Diamond', 0),
(5, 'C', 'Jasper', 0),
(5, 'D', 'Bismuth', 0);

-- Pergunta 6: Qual personagem humano é amigo próximo de Steven e trabalha com rosquinhas?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(6, 'A', 'Greg', 0),
(6, 'B', 'Lars', 1),
(6, 'C', 'Sadie', 0),
(6, 'D', 'Ronaldo', 0);

-- Pergunta 7: O que acontece com a gema de Steven ao final da série Steven Universe Future?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(7, 'A', 'Ela se quebra', 0),
(7, 'B', 'Ela é removida', 1),
(7, 'C', 'Ela evolui', 0),
(7, 'D', 'Ela muda de cor', 0);

-- Pergunta 8: Quem é a melhor amiga humana de Steven e também treina espada com Pearl?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(8, 'A', 'Sadie', 0),
(8, 'B', 'Lars', 0),
(8, 'C', 'Connie', 1),
(8, 'D', 'Kiki', 0);

-- Pergunta 9: Qual fusão representa a união de Garnet, Amethyst e Pearl?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(9, 'A', 'Opal', 0),
(9, 'B', 'Alexandrite', 1),
(9, 'C', 'Sardonyx', 0),
(9, 'D', 'Stevonnie', 0);

-- Pergunta 10: O que acontece quando duas Gems se fundem?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(10, 'A', 'Elas desaparecem', 0),
(10, 'B', 'Elas criam uma nova identidade com personalidade combinada', 1),
(10, 'C', 'Elas mudam de cor', 0),
(10, 'D', 'Elas perdem seus poderes', 0);

INSERT INTO respostahist (fkAlternativa, fkResultado) VALUES
(1, 1),
(5, 1),
(9, 1),
(13, 1),
(17, 1),
(21, 1),
(25, 1),
(29, 1),
(33, 1),
(37, 1);

INSERT INTO respostahist (fkAlternativa, fkResultado) VALUES
(1, 2),
(6, 2),  -- errada
(9, 2),
(13, 2),
(17, 2),
(21, 2),
(25, 2),
(29, 2),
(33, 2),
(37, 2);

INSERT INTO respostahist (fkAlternativa, fkResultado) VALUES
(2, 3),  -- errada
(6, 3),  -- errada
(9, 3),
(13, 3),
(17, 3),
(21, 3),
(25, 3),
(29, 3),
(33, 3),
(37, 3);

INSERT INTO respostahist (fkAlternativa, fkResultado) VALUES
(2, 4),  -- errada
(6, 4),  -- errada
(10, 4), -- errada
(13, 4),
(17, 4),
(21, 4),
(25, 4),
(29, 4),
(33, 4),
(37, 4);

SELECT * FROM Alternativa;