// ignored first line
const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("sample_mflix");
    const collection = database.collection("movies");

    // create a filter to update all movies with a 'G' rating
    const filter = { rated: "G" };
    const options = {};
    options.upsert = true; // create a document if no documents have a 'G' rating

    // increment every document matching the filter with 2 more comments
    const updateDoc = {
      $inc: {
        num_mflix_comments: 2,
      },
    };
    const result = await collection.updateMany(filter, updateDoc, options);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);