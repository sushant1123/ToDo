const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");

const todosGet = JSON.parse(localStorage.getItem("todos"));

if (todosGet) {
  todosGet.forEach(todo => {
    addToDo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addToDo();
});


function addToDo(todo){

  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoElement = document.createElement("li");

    if(todo && todo.completed){
      todoElement.classList.add("completed");
    }

    todoElement.innerText = todoText;

    //click to mark as completed
    todoElement.addEventListener("click", () => {
      todoElement.classList.toggle("completed");

      updateLocalStorage();
    });

    //to remove from the todo list (click right click)
    todoElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoElement.remove();

      updateLocalStorage();
    });

    todos.appendChild(todoElement);

    input.value = "";

    updateLocalStorage();
  }
}

function updateLocalStorage  () {

  const todosEl = document.querySelectorAll("li");
  const todos = [];

  todosEl.forEach((todoEl) => {

    singleTodo = {
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed")
    };

    todos.push(singleTodo);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
