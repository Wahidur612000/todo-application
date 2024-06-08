import { useRef } from 'react';
import Card from '../ui/Card';
import classes from './NewTodoForm.module.css';

function NewTodoForm({ title, description, onChange, onSubmit }) {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  return (
    <Card>
      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes.control}>
          <label htmlFor='title'>Todo Title</label>
          <input
            type='text'
            id='title'
            value={title}
            name="title"
            onChange={onChange}
            ref={titleInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            rows='2'
            value={description}
            name="description"
            onChange={onChange}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Save</button>
        </div>
      </form>
    </Card>
  );
}

export default NewTodoForm;
