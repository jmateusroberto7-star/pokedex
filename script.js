// Base de dados dos Pokémon
const pokedex = {
  pikachu: {
    id: 'card-pikachu',
    nomes: ['pikachu', 'pikachu'],
    tipos: ['eletrico', 'elétrico', 'tipo elétrico', 'tipo eletrico']
  },
  bulbasaur: {
    id: 'card-bulbasaur',
    nomes: ['bulbasaur'],
    tipos: ['planta', 'tipo planta']
  },
  charizard: {
    id: 'card-charizard',
    nomes: ['charizard'],
    tipos: ['fogo', 'tipo fogo']
  },
  squirtle: {
    id: 'card-squirtle',
    nomes: ['squirtle'],
    tipos: ['agua', 'água', 'tipo água', 'tipo agua']
  }
};

// Elementos da página
const campoBusca = document.getElementById('campo-busca');
const container = document.getElementById('pokedex-container');
const opcoesTipos = document.getElementById('opcoes-tipos');
const botoesTipo = document.querySelectorAll('.botao-tipo');
const todosCards = document.querySelectorAll('.card-individual');

// Limpa TODOS os resultados
function limparResultados() {
  todosCards.forEach(card => card.classList.add('oculto'));
  opcoesTipos.classList.add('oculto');
}

// Mostra UM card específico
function mostrarCard(idCard) {
  limparResultados();
  const card = document.getElementById(idCard);
  if (card) card.classList.remove('oculto');
}

// Mostra as 4 opções de tipo
function mostrarOpcoesTipos() {
  limparResultados();
  opcoesTipos.classList.remove('oculto');
}

// Busca conforme o texto digitado
function buscarPokemon(texto) {
  const busca = texto.trim().toLowerCase();
  if (!busca) {
    limparResultados();
    return;
  }

  // Caso 3: digitar "pokémon" → mostra opções de tipos
  if (busca === 'pokemon' || busca === 'pokémon') {
    mostrarOpcoesTipos();
    return;
  }

  // Verificar nome ou tipo
  for (const chave in pokedex) {
    const dado = pokedex[chave];
    
    // Caso 1: buscar por nome
    if (dado.nomes.includes(busca)) {
      mostrarCard(dado.id);
      return;
    }
    
    // Caso 2: buscar por tipo
    if (dado.tipos.includes(busca)) {
      mostrarCard(dado.id);
      return;
    }
  }

  // Se não encontrar nada → limpa tudo
  limparResultados();
}

// Evento de digitação na barra de pesquisa
campoBusca.addEventListener('input', (e) => {
  buscarPokemon(e.target.value);
});

// Clique nos botões de tipo
botoesTipo.forEach(botao => {
  botao.addEventListener('click', () => {
    const tipo = botao.getAttribute('data-tipo');
    
    // Encontra o Pokémon correspondente ao tipo
    for (const chave in pokedex) {
      if (pokedex[chave].tipos.includes(tipo)) {
        mostrarCard(pokedex[chave].id);
        campoBusca.value = ''; // Limpa a barra
        return;
      }
    }
  });
});