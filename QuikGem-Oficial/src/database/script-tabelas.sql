-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

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
resposta VARCHAR(100),
correta TINYINT NOT NULL,
	CONSTRAINT fkAlternativaPergunta FOREIGN KEY (fkPergunta) REFERENCES Pergunta(idPergunta)
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
(default, 'O que acontece quando duas Gems se fundem?', 1),
(default, 'Qual é o nome completo do pai de Steven?', 1),
(default, 'Qual dessas Gems era uma engenheira e construtora?', 1),
(default, 'O que Garnet representa?', 1),
(default, 'Quem é a fusão de Steven e Connie?', 1),
(default, 'Qual é um dos principais temas abordados na série?', 1),
(default, 'Qual é o nome do planeta natal das Gems?', 1),
(default, 'Quem é a líder suprema das Diamonds?', 1),
(default, 'Como Steven geralmente cura outras pessoas ou Gems?', 1),
(default, 'Quem é responsável pela arte visual única de Steven Universe?', 1),
(default, 'Quem é Spinel na história?', 1);


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

-- Pergunta 11: Qual é o nome completo do pai de Steven?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(11, 'A', 'Greg Universe', 0),
(11, 'B', 'Greg DeMayo', 0),
(11, 'C', 'Greg Quartz', 0),
(11, 'D', 'Gregory DeMayo Universe', 1);

-- Pergunta 12: Qual dessas Gems era uma engenheira e construtora?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(12, 'A', 'Bismuth', 1),
(12, 'B', 'Lapis Lazuli', 0),
(12, 'C', 'Peridot', 0),
(12, 'D', 'Jasper', 0);

-- Pergunta 13: O que Garnet representa?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(13, 'A', 'A união entre humano e Gem', 0),
(13, 'B', 'A liderança natural das Gems', 0),
(13, 'C', 'A fusão do amor verdadeiro', 1),
(13, 'D', 'A força bruta do time', 0);

-- Pergunta 14: Quem é a fusão de Steven e Connie?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(14, 'A', 'Opal', 0),
(14, 'B', 'Stevonnie', 1),
(14, 'C', 'Sardonyx', 0),
(14, 'D', 'Rainbow Quartz', 0);

-- Pergunta 15: Qual é um dos principais temas abordados na série?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(15, 'A', 'Tecnologia avançada', 0),
(15, 'B', 'Guerra e destruição', 0),
(15, 'C', 'Família, identidade e aceitação', 1),
(15, 'D', 'Conquista de planetas', 0);

-- Pergunta 16: Qual é o nome do planeta natal das Gems?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(16, 'A', 'Gemworld', 0),
(16, 'B', 'Earth', 0),
(16, 'C', 'Homeworld', 1),
(16, 'D', 'Crystal Empire', 0);

-- Pergunta 17: Quem é a líder suprema das Diamonds?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(17, 'A', 'Yellow Diamond', 0),
(17, 'B', 'Blue Diamond', 0),
(17, 'C', 'White Diamond', 1),
(17, 'D', 'Pink Diamond', 0);

-- Pergunta 18: Como Steven geralmente cura outras pessoas ou Gems?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(18, 'A', 'Com seus escudos', 0),
(18, 'B', 'Com suas lágrimas e saliva', 1),
(18, 'C', 'Com um feixe de energia rosa', 0),
(18, 'D', 'Com um beijo mágico', 0);

-- Pergunta 19: Quem é responsável pela arte visual única de Steven Universe?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(19, 'A', 'Rebecca Sugar', 1),
(19, 'B', 'Pendleton Ward', 0),
(19, 'C', 'Genndy Tartakovsky', 0),
(19, 'D', 'Lauren Faust', 0);

-- Pergunta 20: Quem é Spinel na história?
INSERT INTO Alternativa (fkPergunta, letra, resposta, correta) VALUES
(20, 'A', 'Uma nova Crystal Gem', 0),
(20, 'B', 'Uma amiga esquecida de Pink Diamond', 1),
(20, 'C', 'Uma filha de White Diamond', 0),
(20, 'D', 'Uma invenção humana', 0);