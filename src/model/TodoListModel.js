import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  /**
   * @param {*TodoItemModel} items
   */
  constructor(items = []) {
    super();
    this.items = items;
  }

  getTotalCount() {
    return this.items.length;
  }

  getTodoItems() {
    return this.items;
  }

  onChange(listener) {
    this.addEventListener('change', listener);
  }

  emitChange() {
    this.emit('change');
  }

  addTodoItem(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {{ id:number, completed: boolean }}
   */
  updateTodo({ id, completed }) {
    const item = this.items.find(item => { return item.id === id });
    if (!item) return;
    item.completed = completed;
    this.emitChange();
  }

  /**
   * 指定したidのTodoItemを削除する
   * @param {{ id: number }}
   */
  deleteTodo({ id }) {
    this.items = this.items.filter(item => {
      return item.id !== id;
    })
    this.emitChange();
  }
}
