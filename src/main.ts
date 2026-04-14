import './styles/styles.scss';

const formEl = document.querySelector(".todo-form") as HTMLFormElement;
const inputEl = document.getElementById("todo-input") as HTMLInputElement;
const selectEl = document.getElementById("prioritet") as HTMLSelectElement;
const container = document.getElementById("container") as HTMLInputElement;
const felmeddelandeEl = document.getElementById("felmeddelande") as HTMLParagraphElement;

interface Todo{
    task: string;
    completed: boolean;
    priority: number;
    date: string;
}

class TodoList{
    todos: Todo[] = [];

    addTodo(task: string, priority: number): boolean {
        if (!task.trim() || !priority) {
            return false;
        } else {
            const date = new Date().toLocaleDateString('sv-SE');
            this.todos.push({task, completed: false, priority, date});
            return true;  
        }
    }

    markTodoCompleted(todoIndex: number): void {
        this.todos[todoIndex].completed = true;
    }

    getTodos(): Todo[] {
        return this.todos;
    }

    saveToLocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos))
    }

    loadFromLocalStorage(): void {
        let data = localStorage.getItem("todos")

        if (data) {
            this.todos = JSON.parse(data);
        }
    }

    constructor() {
    this.loadFromLocalStorage();
  }
}

const todoList = new TodoList();

formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    let task = inputEl.value;
    let priority = parseInt(selectEl.value);

    if (todoList.addTodo(task, priority)) {
        felmeddelandeEl.style.display = "none";
        inputEl.value = "";
        renderTodos();
    } else {
        felmeddelandeEl.style.display = "block";
    }
})

function renderTodos(): void{
    container.innerHTML = "";

    todoList.getTodos().forEach((todo, index) => {
        let div = document.createElement("div");

        div.classList.add("todos");

        div.innerHTML = `
            <h3>${todo.task}</h3>
            <p>${todo.priority}</p>
            <p>${todo.date}</p>
            <p>${todo.completed ? "Klar ✅" : "Ej Klar ❌"}</p>
            <button>Markera som klar</button>
        `;

        const btn = div.querySelector("button") as HTMLButtonElement;
        btn.addEventListener("click", () => {
            todoList.markTodoCompleted(index);
            todoList.saveToLocalStorage();
            renderTodos();
        });


        container.appendChild(div);
    });
}

renderTodos();