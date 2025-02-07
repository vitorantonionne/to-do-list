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


function createElementTarefa(tarefa) {
  
  const listaItem = document.createElement("li")
  listaItem.className = "lista-item"
  listaItem.setAttribute("value", tarefa)

  const checkTarefa = document.createElement("button")
  checkTarefa.className = "btn-check"
  checkTarefa.innerHTML = `<i class="ph ph-check"></i>`


  const buttonEditar = document.createElement("button");
  buttonEditar.className = "btn-editar";
  buttonEditar.innerHTML = `<i class="ph ph-pencil"></i>`

  const span = document.createElement("span")
  span.className = "tarefa"
  span.textContent = tarefa

  const buttonFechar = document.createElement("button")
  buttonFechar.className = "btn-fechar"
  buttonFechar.innerHTML = `<i class="ph ph-x"></i>`
  
  listaItem.appendChild(checkTarefa)
  listaItem.appendChild(buttonEditar)
  listaItem.appendChild(span)
  listaItem.appendChild(buttonFechar)


  buttonFechar.addEventListener("click" , () => {    
     listaDeTarefas.removeChild(listaItem)
     const valueListItem = listaItem.getAttribute('value')      
     cachedTasks = cachedTasks.filter((task) => task !== valueListItem)
     localStorage.setItem('tarefas', JSON.stringify(cachedTasks))
  })

  checkTarefa.addEventListener("click", () => {
    listaItem.classList.toggle("feito")
  })

  span.addEventListener("click", () => {
    editarTarefa(span);
  });

  return listaItem
}

function Mode() {
  const html = document.documentElement

  html.classList.toggle('light')
}

function addLista() {
  let tarefa = novaTarefa.value
  if(tarefa) {

    const listaItem  = createElementTarefa(tarefa)
    
    listaDeTarefas.appendChild(listaItem)

    cachedTasks.push(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(cachedTasks))

    novaTarefa.value = ""

  }
}

function editarTarefa(span) {
  const textoAtual = span.textContent;


  const inputEdicao = document.createElement("input");
  inputEdicao.type = "text";
  inputEdicao.value = textoAtual;
  inputEdicao.className = "input-edicao";

  span.replaceWith(inputEdicao);
  inputEdicao.focus();

  inputEdicao.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      salvarEdicao(inputEdicao, span);
    }
  });

  inputEdicao.addEventListener("blur", () => {
    salvarEdicao(inputEdicao, span);
  });
}

function salvarEdicao(input, span) {
  const novoTexto = input.value.trim();

  if (novoTexto) {
    span.textContent = novoTexto;
  }

  input.replaceWith(span);
}