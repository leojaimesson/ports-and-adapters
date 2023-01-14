import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Item } from "../../entities/Item";
import { Observer } from "../../entities/Observer";
import { TodoList, TodoListEvents } from "../../entities/TodoList";
import { TodoGateway } from "../../gateway/TodoGateway";

type Props = {
  todoGateway: TodoGateway;
};

const todoList = new TodoList();

export function TodoListPage({ todoGateway }: Props) {
  const [description, setDescription] = useState<string>("");
  const [list, setList] = useState<Item[]>(todoList.getTodos());

  useEffect(() => {
    todoList.register(
      new Observer(TodoListEvents.UPDATE_VIEW_STATE, (items: Item[]) => {
        setList([...items]);
      })
    );

    todoList.register(
      new Observer(TodoListEvents.ADD_ITEM, (item: Item) => {
        todoGateway.addItem(item);
      })
    );

    todoList.register(
      new Observer(TodoListEvents.REMOVE_ITEM, (item: Item) => {
        todoGateway.removeItem(item.id);
      })
    );

    todoList.register(
      new Observer(TodoListEvents.UPDATE_ITEM, (item: Item) => {
        todoGateway.updateItem(item);
      })
    );

    todoGateway.getTodos().then((data) => {
      todoList.setItems(data);
    });
  }, [todoGateway]);

  return (
    <div>
      {list.length === 0 ? (
        <div>
          No item <hr />
        </div>
      ) : undefined}
      {list.length > 0 ? <span>{todoList.getCompleted()}%</span> : undefined}
      {list.map((item) => (
        <div key={item.id}>
          <span
            style={{
              textDecoration: item.done ? "line-through" : "",
            }}
          >
            {item.description}
          </span>
          <button onClick={() => todoList.toggleDone(item)}>done/undone</button>
          <button onClick={() => todoList.remove(item)}>remover</button>
        </div>
      ))}
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="button"
        onClick={() => todoList.addItem(description, uuidv4())}
      >
        add
      </button>
    </div>
  );
}
