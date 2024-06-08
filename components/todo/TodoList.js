import { useState } from 'react';
import classes from './TodoList.module.css';
import NewTodoForm from './NewTodoForm'; // Adjust the import path as needed
import Card from '../ui/Card'; // Import Card component

function TodoList(props) {
  const [todos, setTodos] = useState(props.Todos);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTodoData, setEditedTodoData] = useState({ title: '', description: '' });

  const toggleTodoHandler = async (id, hasDone) => {
    const response = await fetch('/api/update-todo', {
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

  const editTodoHandler = (todo) => {
    setEditTodoId(todo.id);
    setEditedTodoData({ title: todo.title, description: todo.description });
  };

  const saveTodoHandler = async (id) => {
    const response = await fetch('/api/update-todo', {
      method: 'PATCH',
      body: JSON.stringify({ id, ...editedTodoData }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...editedTodoData } : todo
        )
      );
      setEditTodoId(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    saveTodoHandler(editTodoId);
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
            {editTodoId === todo.id ? (
              <Card className={classes.card}>
                <NewTodoForm
                  title={editedTodoData.title}
                  description={editedTodoData.description}
                  onChange={handleChange}
                  onSubmit={handleEditSubmit}
                />
              </Card>
            ) : (
              <div>
                <span className={classes.title}>{todo.title}</span>
                <span className={classes.description}>{todo.description}</span>
                <button className={classes.edit} onClick={() => editTodoHandler(todo)}>
                  &#128393;
                </button>
              </div>
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
            {editTodoId === todo.id ? (
              <Card className={classes.card}>
                <NewTodoForm
                  title={editedTodoData.title}
                  description={editedTodoData.description}
                  onChange={handleChange}
                  onSubmit={handleEditSubmit}
                />
              </Card>
            ) : (
              <div>
                <span className={classes.title}>{todo.title}</span>
                <span className={classes.description}>{todo.description}</span>
                <button className={classes.edit} onClick={() => editTodoHandler(todo)}>
                  &#128393; 
                </button>
              </div>
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
    </div>
  );
}

export default TodoList;
