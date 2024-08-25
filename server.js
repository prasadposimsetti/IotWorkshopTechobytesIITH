const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express ();
let data = {
 
}

app.use(express.json());
const server = http.createServer(app)
const PORT = process.env.PORT || 5000;
const io = socketIo(server, {
  cors:{
    origin:"http://172.16.209.81:3000"
  }
})
io.on("connection", (socket)=>{
  console.log("clientConnected", socket.id);
  socket.join("clock-room");
  socket.on("disconnect", (reason)=>{
    console.log(reason);
  })
})
server.listen(5001, (err)=>{
  if(err) console.log(err)
    console.log("server started on port", 5001)
})
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });
app.get("/dataExchange", (req, res)=>{
  const name=  req.query.name;
  const sensorValue = req.query.sensorValue;
  const targetDevice = req.query.targetDevice;
  console.log("this guy is sending message: "+ name+ " with sensor Value: " + sensorValue + " this is the target Device "+ targetDevice )

  const updatedSenValue =  sensorValue
   data = {...data, [targetDevice]:updatedSenValue}
  console.log(data )
  io.to("clock-room").emit("Event", data);
res.send(data[name]?data[name]:"0");

  })
app.get("/getData",(req, res)=>{
  
  res.send({data:data})
})