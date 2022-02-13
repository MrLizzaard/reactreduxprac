import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../modules/todos";

const TodosContainer = () => {
  const todos = useSelector((state) => [...state.todos]);

  const dispatch = useDispatch();

  const onAddTodo = (text) => dispatch(todoActions.addTodo(text));
  const onToggleTodo = (id) => dispatch(todoActions.toggleTodo(id));

  const onSubmit = (e) => {
    e.preventDefault();

    onAddTodo(e.target[0].value);

    e.target[0].value = "";
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" />
        <button type="submit">제출</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onToggle={onToggleTodo} />
        ))}
      </ul>
    </div>
  );
};

export default TodosContainer;

const Todo = ({ todo, onToggle }) => {
  return (
    <li onClick={() => onToggle(todo.id)} style={{ textDecoration: todo.done ? "line-through" : "none" }}>
      {todo.text}
    </li>
  );
};
