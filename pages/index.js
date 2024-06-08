import { useEffect, useState } from 'react';
import Head from 'next/head';
import TodoList from '../components/todo/TodoList';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';

function HomePage(props) {
  const [today, setToday] = useState('');

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata',
    });
    setToday(formattedDate);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>React Todos</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react Todos!"
        />
      </Head>
      <div style={{ textAlign: 'center', fontSize: '1.5rem', margin: '20px 0', color: '#333' }}>
        {today}
      </div>
      <TodoList Todos={props.Todos} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://wahidur:wahidur8850@cluster0.fqth8tj.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0'
  );
  const db = client.db();

  const TodosCollection = db.collection('todos');

  const Todos = await TodosCollection.find().toArray();

  client.close();

  return {
    props: {
      Todos: Todos.map((Todo) => ({
        title: Todo.title,
        id: Todo._id.toString(),
        description: Todo.description,
        hasDone: Todo.hasDone || false,
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
