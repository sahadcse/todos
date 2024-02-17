let todoInput = document.getElementById("todo");
let todoList = document.getElementById("list");
let noTodo = document.getElementById("no-todo");

if (todoList.children.length === 0) {
  noTodo.style.display = "block";
}

function addTask() {
  if (todoInput.value === "") {
    alert("Please enter a task");
  } else {
    saveData();

    let task = document.createElement("li");
    task.style.display = "flex";
    task.style.alignItems = "center";
    task.style.width = "96%";
    task.style.marginBottom = "10px";

    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.onclick = function () {
      let spanElement = task.querySelector("span");
      if (checkBox.checked) {
        spanElement.style.textDecoration = "line-through";
      } else {
        spanElement.style.textDecoration = "none";
      }
    };
    checkBox.id = "check";

    let span = document.createElement("span");
    span.id = "task-name";
    span.innerHTML = todoInput.value;

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.id = "delete";
    deleteButton.onclick = function () {
      if (confirm("Are you sure you want to delete this task?")) {
        task.remove();
        if (todoList.children.length === 0) {
          noTodo.style.display = "block";
        }
      }
    };

    task.appendChild(checkBox);
    task.appendChild(span);
    task.appendChild(deleteButton);

    todoList.appendChild(task);
    noTodo.style.display = "none";

    todoInput.value = "";
    saveData();
  }
}

function saveData() {
  let tasks = [];
  for (let i = 0; i < todoList.children.length; i++) {
    let task = todoList.children[i].querySelector("span").innerHTML;
    tasks.push(task);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    for (let i = 0; i < tasks.length; i++) {
      let task = document.createElement("li");
      task.style.display = "flex";
      task.style.alignItems = "center";
      task.style.width = "96%";
      task.style.marginBottom = "10px";

      let checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.onclick = function () {
        let spanElement = task.querySelector("span");
        if (checkBox.checked) {
          spanElement.style.textDecoration = "line-through";
        } else {
          spanElement.style.textDecoration = "none";
        }
      };
      checkBox.id = "check";

      let span = document.createElement("span");
      span.id = "task-name";
      span.innerHTML = tasks[i];

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.id = "delete";
      deleteButton.onclick = function () {
        if (confirm("Are you sure you want to delete this task?")) {
          task.remove();
          if (todoList.children.length === 0) {
            noTodo.style.display = "block";
          }
        }
      };

      task.appendChild(checkBox);
      task.appendChild(span);
      task.appendChild(deleteButton);

      todoList.appendChild(task);
      noTodo.style.display = "none";
    }
  }
}

loadData();
