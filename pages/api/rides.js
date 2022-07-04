import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { profile } from "console";

const simulateAsyncPause = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });

let changeStream;

async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://alken:ezvukZlSa1J1rabk@cluster0.prrif.mongodb.net/taxi_dispatcher_system?retryWrites=true&w=majority"
  );
  return client;
}
async function connectPassenger() {
  const client = await MongoClient.connect(
    "mongodb+srv://alken:ezvukZlSa1J1rabk@cluster0.prrif.mongodb.net/taxi_dispatcher_system?retryWrites=true&w=majority"
  );
  return client;
}

async function checkingIfPassengerRegistered(rides) {
  let registered = false;
  let client;
  client = await connectPassenger();
  const db = client.db();
  const document = await db.collection("passengers").find().toArray();
  document.map((doc) => {
    if (doc.phoneNumber === rides.phoneNumber) {
      registered = true;
    }
  });
  if (registered === false) {
    let client;
    client = await connectPassenger();
    await insertPassenger(client, rides);
  }
  //   console.log(document);

  // client.close();
}

async function insertHistory(client, document) {
  const db = client.db();
  const result = await db.collection("histories").insertOne(document);
}
async function insertPassenger(client, document) {
  const db = client.db();
  const result = await db.collection("passengers").insertOne(document);
}
async function insertPendingRide(client, document) {
  const db = client.db();
  const result = await db.collection("pendingrides").insertOne(document);
}

async function RidePending(ride) {
  let client;
  let rideIsInHistory = false;
  client = await connectDatabase();
  const db = client.db();
  const document = await db.collection("pendingrides").find().toArray();
  document.map((doc) => {
    if (
      doc.pickupLocation === ride.pickupLocation &&
      doc.destination === ride.destination
    ) {
      let newRide = {
        pickupLocation: doc.pickupLocation,
        destination: doc.destination,
        totalBusPassenger:
          ride.vehicleType === "bus"
            ? (doc.totalBusPassenger += 1)
            : doc.totalBusPassenger,
        totalVipPassenger:
          ride.vehicleType === "vip"
            ? (doc.totalVipPassenger += 1)
            : doc.totalVipPassenger,
      };
      db.collection("pendingrides").deleteOne({ _id: doc._id });
      db.collection("pendingrides").insertOne(newRide);

      rideIsInHistory = true;
    }
  });
  if (rideIsInHistory === false) {
    let newRide = {
      pickupLocation: ride.pickupLocation,
      destination: ride.destination,
      totalBusPassenger: ride.vehicleType === "bus" ? 1 : 0,
      totalVipPassenger: ride.vehicleType === "vip" ? 1 : 0,
    };

    const result = await db.collection("pendingrides").insertOne(newRide);
  }
  // return false;
}

async function checkIfRideIsInHistory(ride) {
  let client;
  let rideIsInHistory = false;
  client = await connectDatabase();
  const db = client.db();
  const document = await db.collection("histories").find().toArray();
  document.map((doc) => {
    if (doc.phoneNumber === ride.phoneNumber) {
      db.collection("histories").deleteOne({ phoneNumber: doc.phoneNumber });
    }
  });
  return rideIsInHistory;
  // client.close();
}

async function bookingOrder(req, res) {
  if (req.method === "POST") {
    const pickupLocation = req.body.pickupLocation;
    const destination = req.body.destination;
    const phoneNumber = req.body.phoneNumber;
    const vehicleType = req.body.vehicleType;
    const newRides = {
      pickupLocation: pickupLocation,
      destination: destination,
      phoneNumber: phoneNumber,
      vehicleType: vehicleType,
      status: "pending",
    };
    const newPassenger = {
      phoneNumber: phoneNumber,
    };
    await checkingIfPassengerRegistered(newPassenger);
    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Couldn't connect to database" });
      return;
    }

    if ((await checkIfRideIsInHistory(newRides)) === false) {
      try {
        await insertHistory(client, newRides);
        let resposes = await RidePending(newRides);
        if (resposes === false) {
          let newPending = {
            pickupLocation: pickupLocation,
            destination: destination,
            totalBusPassenger: vehicleType === "bus" ? 1 : 0,
            totalVipPassenger: vehicleType === "vip" ? 1 : 0,
          };
          // insertPendingRide(client, newPending);
        }
        client.close();
      } catch (err) {
        res.status(500).json({ message: "Couldn't store the data" });
        return;
      }

      res.status(201).json({ message: "Ride Booked successfully", stat: "OK" });
    } else {
      res
        .status(201)
        .json({ message: "Ride is already booked", stat: "NOT_OK" });
    }
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
      const document = await db.collection("histories").find().toArray();

      res.status(200).json({
        history: document,
      });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Couldn't get the data" });
    }
  }
}

export default bookingOrder;
