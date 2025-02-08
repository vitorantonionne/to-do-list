const novaTarefa = document.getElementById("tarefa")
const addTarefa = document.getElementById("add-btn-tarefa")
const listaDeTarefas = document.getElementById("tarefa-lista")

let cachedTasks = []

addTarefa.addEventListener("click", () => {
  addLista()
})

novaTarefa.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addLista()
  }
})

document.addEventListener('DOMContentLoaded', function() {
  console.log('Página carregada',localStorage.getItem('tarefas'));
  
  const cachedTarefas = JSON.parse(localStorage.getItem('tarefas'));
  
  cachedTasks.push(...cachedTarefas)

  cachedTasks.forEach((value) => {
    const listaItem = createElementTarefa(value)
    listaDeTarefas.appendChild(listaItem)
  })

});

function Mode() {
  const html = document.documentElement

  html.classList.toggle('light')
}

function objTarefa(conteudo) {
  return {
    id: Date.now(),
    conteudo,
    feito: false
  }
}

function createElementTarefa(tarefa) {
  
  const listaItem = document.createElement("li")
  listaItem.className = "lista-item"
  listaItem.setAttribute("value", tarefa.id)

  if (tarefa.feito) {
    listaItem.classList.add("feito")
  }

  const checkTarefa = document.createElement("button")
  checkTarefa.className = tarefa.feito ? "btn-check feito" : "btn-check"
  checkTarefa.innerHTML = `<i class="ph ph-check"></i>`


  const buttonEditar = document.createElement("button");
  buttonEditar.className = "btn-editar";
  buttonEditar.innerHTML = `<i class="ph ph-pencil"></i>`

  const span = document.createElement("span")
  span.className = "tarefa"
  span.textContent = tarefa.conteudo

  const buttonFechar = document.createElement("button")
  buttonFechar.className = "btn-fechar"
  buttonFechar.innerHTML = `<i class="ph ph-x"></i>`
  
  listaItem.appendChild(checkTarefa)
  listaItem.appendChild(buttonEditar)
  listaItem.appendChild(span)
  listaItem.appendChild(buttonFechar)


  buttonFechar.addEventListener("click" , () => {
    listaDeTarefas.removeChild(listaItem)

    const valueListItem = Number(listaItem.getAttribute("value")) 
    cachedTasks = cachedTasks.filter((task) => task.id !== valueListItem)
    
    localStorage.setItem("tarefas", JSON.stringify(cachedTasks))
  })

  
  checkTarefa.addEventListener("click", () => {
    listaItem.classList.toggle("feito")
    tarefa.feito = !tarefa.feito
    checkTarefa.classList = tarefa.feito ? "btn-check feito" : "btn-check";

    AtualizarLocalStorage()
  })

  span.addEventListener("click", () => {
    editarTarefa(span);
  });

  return listaItem
}

function AtualizarLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(cachedTasks))
}

function addLista() {
  let newTarefa = novaTarefa.value

  if(newTarefa) {
    const tarefa = objTarefa(newTarefa)
    const listaItem  = createElementTarefa(tarefa)
    listaDeTarefas.appendChild(listaItem)

    cachedTasks.push(tarefa)

    AtualizarLocalStorage()

    novaTarefa.value = ""
  }
}

function editarTarefa(span) {
  const textoAtual = span.textContent;

  const inputEdicaoTarefa = document.createElement("input");
  inputEdicaoTarefa.type = "text";
  inputEdicaoTarefa.value = textoAtual;
  inputEdicaoTarefa.className = "input-edicao";

  span.replaceWith(inputEdicaoTarefa);
  inputEdicaoTarefa.focus();
  
  inputEdicaoTarefa.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      salvarEdicao(inputEdicaoTarefa, span);
    }
  });
}

function salvarEdicao(input, span) {
  const novoTexto = input.value;
  
  if (novoTexto) {
    span.textContent = novoTexto;
  }

  input.replaceWith(span);
}