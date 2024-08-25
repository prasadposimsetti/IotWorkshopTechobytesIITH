import React, {useState, useEffect  } from 'react'
import {io} from "socket.io-client"
import './App.css';
import Card from './Card';
function App() {
  const [data, setData] = useState({});
  const [input, setInput] = useState("");
  useEffect(()=>{
    const socket = io("http://172.16.209.81:5001")
    socket.on("connect", ()=>console.log(socket.id))
    socket.on("connect_error", ()=>{
      setTimeout(()=>socket.connect(), 5000)
    })
    socket.on("Event", (socketData)=>{
      console.log("data", socketData)
      setData(socketData)
    })
    socket.on("disconnect", ()=>console.log("server disconnected"))
  },[])
  const handleGetData = ()=>{
    fetch("http://172.16.209.81:5000/getData").then(res=>res.json()).then((responce)=>{
      console.log(responce.data)
      setData(responce.data)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <input type="text" placeholder='enter the userId' onChange={(e)=>{
          setInput(e.target.value)
        }}/>
       <h1>my dashboard</h1>
      <button onClick={()=>{
        handleGetData();
      }}> getData</button>
      <div className='container'>
        
      {input === 'admin' && data && Object.keys(data).map(e=><Card deviceName={e}  sensorValue={data[e]}/>)}
      {input && data[input] && <Card deviceName={input}  sensorValue={data[input]}/>}
      
      </div>
      </header>
    </div>
  );
}

export default App;
