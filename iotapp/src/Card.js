function Card({deviceName, sensorValue}){
    return <div className="card">

        <div className="senValue">{sensorValue === "0" ? "you have got a post ": "empty box"}</div>
        <h3>{deviceName}</h3>
    </div>
}
export default Card;