const idUsuario = sessionStorage.getItem('ID_USUARIO');

fetch(`/dash/buscarMaiorPontuacao/${idUsuario}`)
  .then(response => response.json())
  .then(data => {
    const maxValor = data[0]?.['Max(pontos)'] || 0;
    document.getElementById('maxValor').innerText = parseFloat(maxValor).toFixed(2);
  })
  .catch(error => console.error('Erro ao buscar média de pontuação:', error));

  fetch(`/dash/buscarMenorPontuacao/${idUsuario}`)
  .then(response => response.json())
  .then(data => {
    const minValor = data[0]?.['Min(pontos)'] || 0;
    document.getElementById('minValor').innerText = parseFloat(minValor).toFixed(2);
  })
  .catch(error => console.error('Erro ao buscar média de pontuação:', error));

fetch('/dash/buscarUsuariosPontuacoes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const Usuario = data.map(item => item.nome || item["Nome Usuário"]);
    const pontuacoes = data.map(item => item.pontos);

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
    const media = data.média ? parseFloat(data.média).toFixed(2) : '0.00';
    document.getElementById('pontuacaoMediaUsuario').innerHTML = `${media}`;
  })
  .catch(err => console.error('Erro ao buscar média de pontuação:', err));
