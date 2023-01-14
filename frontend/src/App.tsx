import { TodoHttpGateway } from "./gateway/TodoHttpGateway";
import { AxiosAdpter } from "./infra/http/AxiosAdapter";
import { TodoListPage } from "./presenters/pages/TodoListPage";

function App() {
  return (
    <div className="App">
      <TodoListPage
        todoGateway={
          new TodoHttpGateway(new AxiosAdpter(), "http://localhost:3001")
        }
      />
    </div>
  );
}

export default App;
