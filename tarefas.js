//Ex: 0
class Tarefa {
  constructor(nome, categoria, realizada) {
    this.nome = nome;
    this.categoria = categoria;
    this.realizada = realizada;
  }

  adicionaNaPagina(containerEl) {
    const novoItemLista = document.createElement("li");
    novoItemLista.classList.toggle("item-tarefa");
    novoItemLista.classList.toggle(`categoria-${this.categoria}`);
    novoItemLista.innerHTML = this.nome;
    if (this.realizada) novoItemLista.classList.toggle("marcado");
    // if (
    //   this.categoria != campoFiltroCategoria.value &&
    //   campoFiltroCategoria.value.length > 0
    // )
    //   novoItemLista.classList.toggle("retido-no-filtro");
    containerEl.appendChild(novoItemLista);
    return novoItemLista;
  }
}

//Ex: 1
const tarefas = [
  new Tarefa("Comprar leite", "compras", false),
  new Tarefa("Escutar chimbinha", "lazer", true),
];

const listaTarefas = document.querySelector("#lista-tarefas");
listaTarefas.innerHTML = "";
tarefas.map((tarefa) => tarefa.adicionaNaPagina(listaTarefas));

//Ex: 2
const campoNovaTarefaNome = document.querySelector("#nova-tarefa-nome");
function criarNovaTarefa() {
  const campoNovaTarefaCategoria = document.querySelector(
    "#nova-tarefa-categoria"
  );

  const tarefaNova = new Tarefa(
    campoNovaTarefaNome.value,
    campoNovaTarefaCategoria.value,
    false
  );

  tarefas.push(tarefaNova);

  const novaTarefaEl = tarefaNova.adicionaNaPagina(listaTarefas);
  campoNovaTarefaNome.value = "";
  campoNovaTarefaNome.focus();

  novaTarefaEl.addEventListener('click', toggleTarefa)
}

const botaoAdicionar = document.querySelector("#incluir-nova-tarefa");
botaoAdicionar.addEventListener("click", (_) => criarNovaTarefa());

//Ex: 3
const filtroCategoria = document.querySelector("#filtro-de-categoria");
filtroCategoria.addEventListener("change", (e) => {
  const categoriaSelecionada = e.target.value;

  const itensLista = document.querySelectorAll(".item-tarefa");
  itensLista.forEach((item) => {
    item.classList.toString().includes(categoriaSelecionada)
      ? item.classList.remove("retido-no-filtro")
      : item.classList.add("retido-no-filtro");
  });
});


//Ex: 4
campoNovaTarefaNome.addEventListener('keyup', e => {
	if(e.key === 'Enter')
  criarNovaTarefa()
});


//Ex: 5
function toggleTarefa(e) {
  const elemento = e.target;
  elemento.classList.toggle('marcado')
  tarefas.find(tarefa => tarefa.nome == elemento.innerHTML).realizada = elemento.classList.contains('marcado')
}

document.querySelectorAll('.item-tarefa').forEach(item => {
	item.addEventListener('click', toggleTarefa);
})