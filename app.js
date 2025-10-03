(function(){
  const pedidoLista = document.getElementById('pedido-lista');
  const totalEl = document.getElementById('total');
  const finalizarBtn = document.getElementById('finalizar-pedido');

  let pedido = [];
  let total = 0;

  function atualizarPedido(){
    pedidoLista.innerHTML = '';
    pedido.forEach(item => {
      const div = document.createElement('div');
      div.textContent = `${item.nome} - Qtd: ${item.qtd} - R$ ${(item.qtd * item.preco).toFixed(2)}`;
      pedidoLista.appendChild(div);
    });
    totalEl.textContent = `R$ ${total.toFixed(2)}`;
  }

  function adicionarItem(nome, preco){
    const existente = pedido.find(i => i.nome === nome);
    if(existente){
      existente.qtd++;
    } else {
      pedido.push({nome, preco, qtd: 1});
    }
    total += preco;
    atualizarPedido();
  }

  document.querySelectorAll('button[data-item]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nome = btn.getAttribute('data-item');
      const preco = parseFloat(btn.getAttribute('data-price'));
      adicionarItem(nome, preco);
    });
  });

  finalizarBtn.addEventListener('click', () => {
    if(pedido.length === 0){
      alert('Adicione itens ao pedido antes de finalizar.');
      return;
    }

    let mensagem = "Olá! Gostaria de fazer um pedido:%0A%0A";
    pedido.forEach(item => {
      mensagem += `• ${item.nome} - Qtd: ${item.qtd} - R$ ${(item.qtd * item.preco).toFixed(2)}%0A`;
    });
    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

    window.open(`https://wa.me/5561998084480?text=${mensagem}`, '_blank');
  });
})();