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
  const result = await db.collection("passengers").insertOne(document);
}

async function PassengerHandler(req, res) {
  if (req.method === "POST") {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const profileImage = req.body.profileImage;
    const city = req.body.city;
    const address = req.body.address;

    const newPassenger = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      profileImage: profileImage,
      city: city,
      address: address,
    };

    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Couldn't connect to database" });
      return;
    }
    try {
      await insertDocument(client, newPassenger);
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Couldn't store the data" });
      return;
    }

    res
      .status(201)
      .json({ message: "Passenger registered successfully", stat: "OK" });
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

// function PassengerHandler(req, res, next){
//   if(req.method === "GET"){
//       const filepath = path.join(process.cwd(), "Data", "passengers.json");
//       const fileData = fs.readFileSync(filepath);
//       const data = JSON.parse(fileData);
//       res.status(200).json({TableData: data});
//   }
//   if(req.method === "POST"){

//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
//     const phoneNumber = req.body.phoneNumber;
//     const city = req.body.city;
//     const address = req.body.adress;

//     // const newPassenger = {
//     //   id: new Date().toISOString(),
//     //   name: name,
//     //   email: email,
//     //   password: password,
//     //   phoneNumber: phoneNumber,
//     //   city: city,
//     //   address: address
//     // };
//     const filePath = path.join(process.cwd(), "Data", "demopassenger.json");
//     const fileData = fs.readFileSync(filePath);
//     const data = JSON.parse(fileData);
//     let ider = 0;
//     data.forEach(dd => {if(Number(dd.id) > ider){ider = Number(dd.id)}});

//     // let ider = data[0].id;

//     //  id = data.map(d => {if(Number(d.id) > Number(id)){return Number(d.id)}});

//      const newPassenger = {
//       id: ++ider,
//       name: name,
//       email: email,
//       password: password,
//       phoneNumber: phoneNumber,
//       city: city,
//       address: address
//     };
//     data.push(newPassenger);
//     fs.writeFileSync(filePath, JSON.stringify(data));

//     // res.status(201).json({message: "success!", feedback: newFeedback});
//   }
// }

export default PassengerHandler;
