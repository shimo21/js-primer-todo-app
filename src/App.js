import { TodoItemModel } from './model/TodoItemModel.js';
import { TodoListModel } from './model/TodoListModel.js';
import { TodoListView } from './view/TodoListView.js';
import { element, render } from './view/html-util.js';

export class App {
  constructor() {
    this.todoListModel = new TodoListModel();
  }

  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');
    // Todoアイテム数
    let todoItemCount = 0;

    // 状態変化時の挙動
    this.todoListModel.onChange(() => {
      const todoItems = this.todoListModel.getTodoItems();
      const todoListView = new TodoListView();
      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.todoListModel.updateTodo({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.todoListModel.deleteTodo({ id });
        }
      })
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数： ${this.todoListModel.getTotalCount()}`;
    })

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.todoListModel.addTodoItem(new TodoItemModel({
        title: inputElement.value,
        completed: false,
      }));
      // 入力欄を空文字にリセット
      inputElement.value = "";
    });
  }
}
