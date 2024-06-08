import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewTodoForm from '../../components/todo/NewTodoForm';

function NewTodoPage() {
  const router = useRouter();

  async function addTodoHandler(enteredTodoData) {
    const response = await fetch('/api/new-todo', {
      method: 'POST',
      body: JSON.stringify(enteredTodoData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);
    
    if (response.ok) {
      router.push('/');
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Todo</title>
        <meta
          name="description"
          content="Add your own Todos and create amazing networking opportunities."
        />
      </Head>
      <NewTodoForm onAddTodo={addTodoHandler} />
    </Fragment>
  );
}

export default NewTodoPage;
