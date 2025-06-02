const idUsuario = sessionStorage.getItem('ID_USUARIO');

fetch(`/dash/buscarMaiorPontuacao/${idUsuario}`)
  .then(response => response.json())
  .then(data => {
    const maxValor = data[0]?.['Pontuacao_Maxima'] || 0;
    document.getElementById('maxValor').innerText = parseFloat(maxValor).toFixed(2);

  })
  .catch(error => console.error('Erro ao buscar média de pontuação:', error));

  fetch(`/dash/buscarMenorPontuacao/${idUsuario}`)
  .then(response => response.json())
  .then(data => {
    const minValor = data[0]?.['pontuacao_minima'] || 0;
    document.getElementById('minValor').innerText = parseFloat(minValor).toFixed(2);
  })
  .catch(error => console.error('Erro ao buscar menor pontuação:', error));

fetch('/dash/buscarUsuariosPontuacoes', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const Usuario = data.map(item => item.nome || item["Usuário"]);
    const pontuacoes = data.map(item => item.pontos || item["Pontuação"]);

    const chartData = {
      labels: Usuario,
      datasets: [{ 
        label: 'Pontuação dos Usuários', 
        data: pontuacoes, 
        backgroundColor: '#541C5D',
        color: '#000' }],
    };

    new Chart(document.getElementById('grafico1'), { type: 'bar', data: chartData });
  })
  .catch(error => console.error('Erro ao buscar pontuação dos Usuarios:', error));



fetch(`/dash/buscarMediaPontuacao`)
  .then(res => res.json())
  .then(data => {
    const media = data.Média ? parseFloat(data.Média).toFixed(2) : '0.00';
    document.getElementById('pontuacaoMediaUsuario').innerHTML = `${media}`;
  })
  .catch(err => console.error('Erro ao buscar média de pontuação:', err));

fetch('/dash/DistribuicaoPorDesempenho')
  .then(res => res.json())
  .then(data => {
    console.log("Dados recebidos:", data);

    let desempenhoLabels = [];
    let desempenhoCounts = [];

    // Caso data seja um array (formato ideal: [{categoria: 'Excelente', quantidade: 5}, ...])
    if (Array.isArray(data)) {
      desempenhoLabels = data.map(item => item.desempenho || item.categoria);
      desempenhoCounts = data.map(item => item.quantidade);
    }
    // Caso data seja um objeto: {Excelente: 5, Bom: 3, Ruim: 2}
    else if (typeof data === 'object') {
      desempenhoLabels = Object.keys(data);
      desempenhoCounts = Object.values(data);
    } else {
      throw new Error('Formato inesperado de dados recebidos');
    }

    const ctx = document.getElementById('grafico2').getContext('2d');

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: desempenhoLabels,
        datasets: [{
          label: 'Distribuição por Desempenho',
          data: desempenhoCounts,
          backgroundColor: [
            '#4caf50',
            '#2196f3',
            '#ff9800',
            '#f44336'
          ],
          borderColor: '#fff',
          borderWidth: 2,
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: { position: 'left' },
          tooltip: { enabled: true }
        }
      }
    });
  })
  .catch(err => console.error('Erro ao buscar distribuição por desempenho:', err));


