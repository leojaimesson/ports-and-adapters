import { Item } from "./Item";
import { Observable } from "./Observable";

export enum TodoListEvents {
  UPDATE_VIEW_STATE = "UPDATE_VIEW_STATE",
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  UPDATE_ITEM = "UPDATE_ITEM",
}

export class TodoList extends Observable {
  private items: Item[];

  constructor() {
    super();
    this.items = [];
  }

  setItems(items: any) {
    const newItems = [];
    for (const item of items) {
      newItems.push(new Item(item.id, item.description, item.done));
    }
    this.items = newItems;
    this.notify(TodoListEvents.UPDATE_VIEW_STATE, this.items);
  }

  async addItem(description: string, id: string) {
    if (!description) return;
    if (this.items.some((item: any) => item.description === description))
      return;
    if (this.items.filter((item: any) => !item.done).length > 5) return;

    const newItem = new Item(id, description, false);
    this.items.push(newItem);
    this.notify(TodoListEvents.UPDATE_VIEW_STATE, this.items);
    this.notify(TodoListEvents.ADD_ITEM, newItem);
  }

  getTodos() {
    return this.items;
  }

  async remove(item: any) {
    this.items.splice(this.items.indexOf(item), 1);
    this.notify(TodoListEvents.UPDATE_VIEW_STATE, this.items);
    this.notify(TodoListEvents.REMOVE_ITEM, item);
  }

  async toggleDone(item: any) {
    item.done = !item.done;
    this.items.splice(this.items.indexOf(item), 1, item);
    this.notify(TodoListEvents.UPDATE_VIEW_STATE, this.items);
    this.notify(TodoListEvents.UPDATE_ITEM, item);
  }

  getCompleted() {
    const total = this.items.length;
    const done = this.items.filter((item: any) => item.done).length;

    return Math.round((done / total) * 100);
  }
}
