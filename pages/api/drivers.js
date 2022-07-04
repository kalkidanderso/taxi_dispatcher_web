import fs from "fs";
import path from "path";
import {MongoClient} from "mongodb";

async function connectDatabase(){
  const client = await MongoClient.connect("mongodb+srv://alken:ezvukZlSa1J1rabk@cluster0.prrif.mongodb.net/taxi_dispatcher_system?retryWrites=true&w=majority");
  return client;
}

async function insertDocument(client, document){
  const db = client.db();
  const result = await db.collection("drivers").insertOne(document);
}


async function DriverHandler(req, res){
  if(req.method === "POST"){
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const phoneNumber = req.body.phoneNumber;
      const profileImage = req.body.profileImage;
      const city = req.body.city;
      const address = req.body.address; 

      const newDriver = {
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        profileImage: profileImage,
        city: city,
        address: address
      };

      let client;
      try{
        client = await connectDatabase();
        
      }catch(err){
        res.status(500).json({message: "Couldn't connect to database"});
        return;
      }
      try{
          await insertDocument(client, newDriver)
          client.close();
      }catch(err){
        res.status(500).json({message: "Couldn't store the data"});
        return;
      }
    
      res.status(201).json({message: "Driver registered successfully", stat: "OK"});
  }
  if(req.method === "GET"){
    let client;
    try{
       client = await connectDatabase();
    }catch(err){
      res.status(500).json({message: "Couldn't connect to database"});
      return;
    }
    try{
      const db = client.db();
      const document = await db.collection("drivers").find().toArray();

      res.status(200).json({drivers: document, message : "Drivers retrieved successfuly"});
      client.close();
    }catch(error){
      res.status(500).json({message: "Couldn't get the data"});
    }
     
       

  }

}


export default DriverHandler;