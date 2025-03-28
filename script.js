// select elements

const form = document.getElementById("form");
const input = document.getElementById("input");
const todoUl = document.getElementById("todos");


// load todos from localstorage on page load
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

// render saved todos

savedTodos.forEach(todo => addTodo(todo));


// Form Submit Event: Add new todo
form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page reload

    if (input.value.trim() !== "") {
        addTodo({ text: input.value, completed: false });
        input.value = ""; // clear input field
    }
});


function addTodo(todo)
{
    const todoEl = document.createElement("li");
    todoEl.innerText = todo.text;

    //mark as completed if previously completed
    if (todo.completed)
    {
        todoEl.classList.add("completed");
    }

    // toggle completed on left click
    todoEl.addEventListener("click", () => {
        todoEl.classList.toggle("completed");
        updateLocalStorage();
    })

    // delete todo on right click
    todoEl.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        todoEl.remove();
        updateLocalStorage();
    });

    // append the list
    todoUl.appendChild(todoEl);
    updateLocalStorage();
}

// function to update the local storage

function updateLocalStorage()
{
    const todos = [];
    document.querySelectorAll(".todos li").forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}