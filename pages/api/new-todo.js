import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log('handler',data)

    const client = await MongoClient.connect(
      'mongodb+srv://wahidur:wahidur8850@cluster0.fqth8tj.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();

    const todosCollection = db.collection('todos');

    const result = await todosCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Todo inserted!' });
  }
}

export default handler;