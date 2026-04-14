import './styles/styles.scss';

const formEl = document.querySelector(".todo-form") as HTMLFormElement;
const inputEl = document.getElementById("todo-input") as HTMLInputElement;
const selectEl = document.getElementById("prioritet") as HTMLSelectElement;
const container = document.getElementById("container") as HTMLInputElement;

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