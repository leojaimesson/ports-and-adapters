import { Item } from "../entities/Item";
import { HttpClient } from "../infra/http/HttpClient";
import { TodoGateway } from "./TodoGateway";

export class TodoHttpGateway implements TodoGateway {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly baseUrl: string
  ) {}

  getTodos(): Promise<any> {
    return this.httpClient.get(`${this.baseUrl}/todos`);
  }

  addItem(item: Item): Promise<any> {
    return this.httpClient.post(`${this.baseUrl}/todos`, item);
  }

  updateItem(item: Item): Promise<any> {
    return this.httpClient.put(`${this.baseUrl}/todos/${item.id}`, item);
  }

  removeItem(id: string): Promise<any> {
    return this.httpClient.delete(`${this.baseUrl}/todos/${id}`);
  }
}
