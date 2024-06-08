import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://wahidur:wahidur8850@cluster0.fqth8tj.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0'
    );
    const db = client.db();

    const TodosCollection = db.collection('todos');

    await TodosCollection.deleteOne({ _id: new ObjectId(id) });

    client.close();

    res.status(200).json({ message: 'Todo deleted!' });
  }
}

export default handler;
