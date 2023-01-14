import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();

app.use(express.json());
app.use(cors());

const todos = [
  {
    id: crypto.randomUUID(),
    description: "estudar matematica",
    done: false,
  },
  {
    id: crypto.randomUUID(),
    description: "assistir naruto",
    done: true,
  },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  todos.push(req.body);
  res.end();
});

app.delete("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === req.params.id);
  if (todo) {
    todos.splice(todos.indexOf(todo), 1);
  }
  res.end();
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === req.params.id);
  if (todo) {
    todo.done = req.body.done;
  }
  res.end();
});

app.listen(3001);
