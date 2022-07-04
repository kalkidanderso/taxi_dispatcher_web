import { MongoClient } from "mongodb";
import { Server } from "socket.io";
import mongoose from "mongoose";

function SocketHandler(req, res) {
  // const client =
  //   "mongodb+srv://alken:ezvukZlSa1J1rabk@cluster0.prrif.mongodb.net/socketServer?retryWrites=true&w=majority";
  // MongoClient.connect(client, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  //   .then(() => {
  //     console.log("connected");
  //   })
  //   .catch((err) => console.log(err));
  // io.on("connection", (socket) => {
  //   // Msg.find().then(result => {
  //   //     socket.emit('output-messages', result)
  //   // })
  //   console.log("a user connected");
  //   socket.emit("message", "Hello world");
  //   socket.on("disconnect", () => {
  //     console.log("user disconnected");
  //   });
  //   socket.on("chatmessage", (msg) => {
  //     // const message = new Msg({ msg });
  //     let newDriver = { userName: "kalkidan", password: "kalkidan" };
  //     const db = client.db();
  //     const result = db.collection("socket").insertOne(document);
  //     io.emit("message", msg);
  //   });
  // });

  // async function connectDatabase() {
  //   const client = await MongoClient.connect(
  //     "mongodb+srv://alken:ezvukZlSa1J1rabk@cluster0.prrif.mongodb.net/socketServer?retryWrites=true&w=majority"
  //   );
  //   return client;
  // }

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // let drivers = getData();

      socket.on("input-change", (msg) => {
        socket.broadcast.emit("update-input", msg);
        console.log(msg);
        //   let client = MongoClient.connect(
        //     "mongodb+srv://alken:ezvukZlSa1J1rabk@cluster0.prrif.mongodb.net/socketServer?retryWrites=true&w=majority"
        //   );
        //   let newDriver = { userName: "kalkidan", password: "kalkidan" };
        //   const db = client.db();
        //   const result = db
        //     .collection("socket")
        //     .insertOne({ mesg: "This is the message" });
      });

      // client.close();
    });
  }
  res.end();
}

export default SocketHandler;
