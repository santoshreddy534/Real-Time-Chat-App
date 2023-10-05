const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")

//Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res)=>{
    res.send("Welcome to our chat app APIs..")
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res)=>{
    console.log(`Server is Listening on ${port}`);
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>
    console.log("MongoDB connection established"))
    .catch((error)=>{
        console.log("MongoDB connection failed: ", error.message);
    })