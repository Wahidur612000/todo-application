import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { id, hasDone } = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://wahidur:wahidur8850@cluster0.fqth8tj.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();

    const TodosCollection = db.collection('todos');

    await TodosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { hasDone: hasDone } }
    );

    client.close();

    res.status(200).json({ message: 'Todo updated!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;
