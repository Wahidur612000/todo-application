import { useRef } from 'react';
import Card from '../ui/Card';
import classes from './NewTodoForm.module.css';

function NewTodoForm(props) {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const todoData = {
      title: enteredTitle,
      description: enteredDescription,
    };

    props.onAddTodo(todoData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Todo Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows='2'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Todo</button>
        </div>
      </form>
    </Card>
  );
}

export default NewTodoForm;
