import { MongoClient } from "mongodb";

async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://alken:ezvukZlSa1J1rabk@cluster0.prrif.mongodb.net/taxi_dispatcher_system?retryWrites=true&w=majority"
  );
  return client;
}
async function proceedingRides(req, res) {
  if (req.method === "GET") {
    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Couldn't connect to database" });
      return;
    }
    try {
      const db = client.db();
      const document = await db.collection("proceedingrides").find().toArray();

      res.status(200).json({
        proceedingRides: document,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Couldn't get the data" });
    }
  }
}

export default proceedingRides;
