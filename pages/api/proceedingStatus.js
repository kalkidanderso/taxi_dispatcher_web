import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { profile } from "console";

async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://alken:ezvukZlSa1J1rabk@cluster0.prrif.mongodb.net/taxi_dispatcher_system?retryWrites=true&w=majority"
  );
  return client;
}

async function insertDocument(client, document) {
  const db = client.db();
  const result = await db.collection("histories").insertOne(document);
}

async function StatusChanging(req, res) {
  if (req.method === "POST") {
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const phoneNumber = req.body.phoneNumber;
    // const profileImage = req.body.profileImage;
    // const city = req.body.city;
    // const address = req.body.address;

    let driver_vehicle_type = req.body.driver_vehicle_type;
    let pickupLocation = req.body.pickupLocation;
    let destination = req.body.destination;
    let totalBusPassenger = req.body.totalBusPassenger;
    let totalVipPassenger = req.body.totalVipPassenger;

    let client;
    client = await connectDatabase();
    const db = client.db();
    const document = await db.collection("histories").find().toArray();
    let number = 1;
    for (let doc = 0; doc < document.length; doc++) {
      if (
        document[doc].status === "pending" &&
        document[doc].pickupLocation === pickupLocation &&
        document[doc].destination === destination &&
        document[doc].vehicleType === driver_vehicle_type
      ) {
        if (number < 11) {
          db.collection("histories").update(
            { phoneNumber: document[doc].phoneNumber },
            { $set: { status: "proceeding" } }
          );
          // 0945858585
          number++;
        }
      }
    }

    res
      .status(201)
      .json({ message: "Database updated successfully", stat: "OK" });
  }
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
      const document = await db.collection("passengers").find().toArray();

      res.status(200).json({
        passengers: document,
        message: "Passengers retrieved successfuly",
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Couldn't get the data" });
    }
  }
}

export default StatusChanging;
