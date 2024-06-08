import { useState } from 'react';
import classes from './TodoList.module.css';

function TodoList(props) {
  const [todos, setTodos] = useState(props.Todos);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const toggleTodoHandler = async (id, hasDone) => {
    const response = await fetch('/api/patch-todo', {
      method: 'PATCH',
      body: JSON.stringify({ id, hasDone: !hasDone }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, hasDone: !hasDone } : todo
        )
      );
    }
  };

  const deleteTodoHandler = async (id) => {
    const response = await fetch('/api/delete-todo', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  const startEditingHandler = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const saveEditHandler = async (id) => {
    const response = await fetch('/api/update-todo', {
      method: 'PUT',
      body: JSON.stringify({ id, title: editTitle, description: editDescription, hasDone: false }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: editTitle, description: editDescription } : todo
        )
      );
      setEditId(null);
      setEditTitle('');
      setEditDescription('');
    }
  };

  return (
    <div>
      <h2>Active Todos</h2>
      <ul className={classes.list}>
        {todos.filter(todo => !todo.hasDone).map((todo) => (
          <li key={todo.id} className={classes.item}>
            <input
              type="checkbox"
              className={classes.checkbox}
              checked={todo.hasDone}
              onChange={() => toggleTodoHandler(todo.id, todo.hasDone)}
            />
            {editId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={() => saveEditHandler(todo.id)}>Save</button>
              </div>
            ) : (
              <>
                <span className={classes.title}>{todo.title}</span>
                <span className={classes.description}>{todo.description}</span>
                <button
                  className={classes.edit}
                  onClick={() => startEditingHandler(todo)}
                >
                  &#128393;
                </button>
              </>
            )}
            <button
              className={classes.delete}
              onClick={() => deleteTodoHandler(todo.id)}
            >
              &#x1F5D1;
            </button>
          </li>
        ))}
      </ul>

      <h2>Completed Todos</h2>
      <ul className={classes.list}>
        {todos.filter(todo => todo.hasDone).map((todo) => (
          <li key={todo.id} className={classes.item}>
            <input
              type="checkbox"
              className={classes.checkbox}
              checked={todo.hasDone}
              onChange={() => toggleTodoHandler(todo.id, todo.hasDone)}
            />
            <span className={classes.title}>{todo.title}</span>
            <span className={classes.description}>{todo.description}</span>
            <button
              className={classes.delete}
              onClick={() => deleteTodoHandler(todo.id)}
            >
              &#x1F5D1;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
