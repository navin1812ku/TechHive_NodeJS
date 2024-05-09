const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose=require("mongoose")
const express = require("express");
const UserRouter = require("./routes/UserRouter");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(UserRouter);
mongoose.connect('mongodb://127.0.0.1:27017/myapp')

app.listen(8082,()=>{
    console.log("Server started!!!")
});